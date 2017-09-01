import { INeuronsResponse, NeuronsResponse, SingleNeuronsResponse } from './NeuronsResponse';
import { NeuronsResponseFactory } from './NeuronsResponseFactory';
import { UserInput } from '../../BasicUserInput';
import { RequestContext } from '../../BasicRequestContext';
import { INeuronResponse } from '../../neurons/responses/SimpleResponse';
import { SilenceNeuron } from '../../SilenceNeuron';
import { Silence } from '../../neurons/responses/Silence';

export interface IHiveMindNeurons {
    findMatch(input: UserInput,
              context: RequestContext,): Promise<INeuronsResponse>;
}

export interface IHiveMindNeuron {
    process(userInput: UserInput,
            context: RequestContext,): Promise<INeuronResponse>;
}

export const getEmptyNeuronsResponse: () => INeuronsResponse = () => {
    return new NeuronsResponse(
        [],
        new SingleNeuronsResponse(SilenceNeuron.INSTANCE, new Silence()),
    );
};

export class BasicHiveMindNeurons implements IHiveMindNeurons {
    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;

    constructor(neurons: IHiveMindNeuron[], certaintyThreshold: number) {
        this.neurons = neurons;
        this.certaintyThreshold = certaintyThreshold;
    }

    public findMatch(userInput: UserInput,
                     context: RequestContext,): Promise<INeuronsResponse> {
        return new Promise((resolve, reject) => {
            let potentialResponse: INeuronsResponse = getEmptyNeuronsResponse();
            let potentialResponseIndex: number;
            let maxCertainty = 0;

            const neuronResponses: Array<Promise<INeuronResponse>> = [];

            for (let i = 0; i < this.neurons.length; i++) {
                const neuron = this.neurons[i];
                const promiseResponse = neuron.process(userInput, context);
                neuronResponses.push(promiseResponse);

                promiseResponse.then((response: INeuronResponse) => {
                    if (response.hasAnswer()) {
                        if (
                            response.getCertainty() >= this.certaintyThreshold
                        ) {
                            this.placeNeuronToTop(i);
                            resolve(NeuronsResponseFactory.create(neuron, response));
                        }

                        if (response.getCertainty() > maxCertainty) {
                            potentialResponse = NeuronsResponseFactory.create(neuron, response);
                            potentialResponseIndex = i;
                            maxCertainty = response.getCertainty();
                        }
                    }
                }).catch(error => {
                    console.error('Neuron: ' + neuron + ' rejected...' + error);
                });
            }

            Promise.all(
                neuronResponses,
            ).then((allResolved: INeuronResponse[]) => {
                this.placeNeuronToTop(potentialResponseIndex);
                resolve(potentialResponse);
            }).catch(error => {
                console.error('A neuron rejected instead of resolved, ' +
                    'neurons are never allowed to reject. If this happens ' +
                    'the neuron either needs to be fixed with error handling to ' +
                    'make it resolve a Silence() response or the neuron should ' +
                    'be removed. Error: ' + error);
            });
            ;
        });
    }

    private placeNeuronToTop(i: number) {
        if (i > 0) {
            const swap = this.neurons[0];
            this.neurons[0] = this.neurons[i];
            this.neurons[i] = swap;
        }
    }
}
