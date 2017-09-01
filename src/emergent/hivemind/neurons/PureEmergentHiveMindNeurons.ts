import { IHiveMindNeuron, IHiveMindNeurons } from './HiveMindNeurons';
import { UserInput } from '../../BasicUserInput';
import { RequestContext } from '../../BasicRequestContext';
import { INeuronsResponse, ISingleNeuronsResponse, SingleNeuronsResponse } from './NeuronsResponse';
import { INeuronResponse } from '../../neurons/responses/SimpleResponse';
import { NeuronsResponseFactory } from './NeuronsResponseFactory';

export class PureEmergentHiveMindNeurons implements IHiveMindNeurons {

    private neurons: IHiveMindNeuron[];

    constructor(neurons: IHiveMindNeuron[]) {
        this.neurons = neurons;
    }

    public findMatch(userInput: UserInput,
                     context: RequestContext,): Promise<INeuronsResponse> {
        return new Promise((resolve) => {
            let responses: ISingleNeuronsResponse[] = [];

            const neuronResponses: Array<Promise<INeuronResponse>> = [];

            for (let i = 0; i < this.neurons.length; i++) {
                const neuron = this.neurons[i];
                const promiseResponse = neuron.process(userInput, context);
                neuronResponses.push(promiseResponse);

                promiseResponse.then((response: INeuronResponse) => {
                    if (response.hasAnswer()) {
                        responses.push(new SingleNeuronsResponse(neuron, response));
                    }
                }).catch(error => {
                    console.error('FATAL Neuron: ' + neuron + ' rejected...' + error);
                });
            }

            Promise.all(
                neuronResponses,
            ).then((allResolved: INeuronResponse[]) => {
                const toResolve = NeuronsResponseFactory.createMultiple(responses);
                this.placeNeuronsToTop(toResolve.getResponses().map(response => response.getFiredNeuron()));
                resolve(toResolve);
            }).catch(error => {
                console.error('A neuron rejected instead of resolved, ' +
                    'neurons are never allowed to reject. If this happens ' +
                    'the neuron either needs to be fixed with error handling to ' +
                    'make it resolve a Silence() response or the neuron should ' +
                    'be removed. Error: ' + error);
            });
        });
    }

    private placeNeuronsToTop(neurons: IHiveMindNeuron[]) {
        // reverse the neurons from highest to lowest -> lowest to highest, so the highest certainty is placed to the top
        // last, making it the new top neuron
        const neuronsReversed = neurons.concat([]).reverse();
        neuronsReversed.forEach(toTop => {
            if (this.neurons.indexOf(toTop) > 0) {
                this.neurons = this.neurons.filter(neuron => neuron !== toTop);
                this.neurons = [toTop].concat(this.neurons);
            }
        });

    }
}
