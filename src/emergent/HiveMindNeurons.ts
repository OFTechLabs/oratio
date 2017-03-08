import {Silence} from "./neurons/responses/Silence";
import {INeuronResponse} from "./neurons/responses/SimpleResponse";

export interface IHiveMindNeurons {

    findMatch(input: string[], locale: string, context: any): Promise<INeuronResponse>;
}

export interface IHiveMindNeuron {

    process(words: string[], locale: string, context: any): Promise<INeuronResponse>;

}

export class BasicHiveMindNeurons implements IHiveMindNeurons {

    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;

    constructor(neurons: IHiveMindNeuron[], certaintyThreshold: number) {
        this.neurons = neurons;
        this.certaintyThreshold = certaintyThreshold;
    }

    public findMatch(input: string[], locale: string, context: any): Promise<INeuronResponse> {
        return new Promise((resolve, reject) => {
            let potentialResponse: INeuronResponse = new Silence();
            let maxCertainty = 0;

            const neuronResponses: Array<Promise<INeuronResponse>> = [];

            for (let i = 0; i < this.neurons.length; i++) {
                const promiseResponse = this.neurons[i].process(input, locale, context);
                neuronResponses.push(promiseResponse);

                promiseResponse.then((response: INeuronResponse) => {
                    if (response.hasAnswer()) {
                        if (response.getCertainty() >= this.certaintyThreshold) {
                            this.placeNeuronToTop(i);
                            resolve(response);
                        }

                        if (response.getCertainty() > maxCertainty) {
                            potentialResponse = response;
                            maxCertainty = response.getCertainty();
                        }
                    }
                });
            }

            Promise.all(neuronResponses).then((allResolved: INeuronResponse[]) => {
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
