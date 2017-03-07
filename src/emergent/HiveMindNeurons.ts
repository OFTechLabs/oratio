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
        let potentialResponse: Promise<INeuronResponse> = null;
        let maxCertainty = 0;
        let certainResponse: Promise<INeuronResponse> = null;

        const neuronResponses: Array<Promise<INeuronResponse>> = [];

        for (let i = 0; i < this.neurons.length; i++) {
            const promiseResponse = this.neurons[i].process(input, locale, context);
            neuronResponses.push(promiseResponse);

            promiseResponse.then((response: INeuronResponse) => {
                if (response.hasAnswer()) {
                    if (response.getCertainty() > maxCertainty) {
                        potentialResponse = Promise.resolve(response);
                        maxCertainty = response.getCertainty();
                    }

                    if (response.getCertainty() >= this.certaintyThreshold) {
                        this.placeNeuronToTop(i);
                        certainResponse = potentialResponse;
                    }
                }
            });
        }

        return Promise.all(neuronResponses).then((allResolved: INeuronResponse[]) => {
            return (certainResponse === null) ? new Silence() : potentialResponse;
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
