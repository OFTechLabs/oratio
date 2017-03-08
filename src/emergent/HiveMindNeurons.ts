import {Silence} from "./neurons/responses/Silence";
import {INeuronResponse} from "./neurons/responses/SimpleResponse";
import {HiveMindContext} from "./HiveMindContext";
import {NeuronsResponse, INeuronsResponse} from "./NeuronsResponse";

export interface IHiveMindNeurons {

    findMatch(input: string[], locale: string, context: HiveMindContext): Promise<INeuronsResponse>;
}

export interface IHiveMindNeuron {

    process(words: string[], locale: string, context: HiveMindContext): Promise<INeuronResponse>;

}

export class BasicHiveMindNeurons implements IHiveMindNeurons {

    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;

    constructor(neurons: IHiveMindNeuron[], certaintyThreshold: number) {
        this.neurons = neurons;
        this.certaintyThreshold = certaintyThreshold;

    }

    public findMatch(input: string[], locale: string, context: HiveMindContext): Promise<INeuronsResponse> {
        return new Promise((resolve, reject) => {
            let potentialResponse: INeuronsResponse = new NeuronsResponse(null, new Silence());
            let potentialResponseIndex: number;
            let maxCertainty = 0;

            const neuronResponses: Array<Promise<INeuronResponse>> = [];

            for (let i = 0; i < this.neurons.length; i++) {
                const promiseResponse = this.neurons[i].process(
                    input,
                    locale,
                    context);
                neuronResponses.push(promiseResponse);

                promiseResponse.then((response: INeuronResponse) => {
                    if (response.hasAnswer()) {
                        if (response.getCertainty() >= this.certaintyThreshold) {
                            this.placeNeuronToTop(i);
                            resolve(new NeuronsResponse(this.neurons[i], response));
                        }

                        if (response.getCertainty() > maxCertainty) {
                            potentialResponse = new NeuronsResponse(this.neurons[i], response);
                            potentialResponseIndex = i;
                            maxCertainty = response.getCertainty();
                        }
                    }
                });
            }

            Promise.all(neuronResponses).then((allResolved: INeuronResponse[]) => {
                this.placeNeuronToTop(potentialResponseIndex);
                resolve(potentialResponse);
            });
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
