import {Silence} from "./neurons/responses/Silence";
import {INeuronResponse} from "./neurons/responses/SimpleResponse";

export interface IHiveMindNeurons {

    findMatch(input: string[], locale: string, context: any): INeuronResponse;
}

export interface IHiveMindNeuron {

    process(words: string[], locale: string, context: any): INeuronResponse;

}

export class BasicHiveMindNeurons implements IHiveMindNeurons {

    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;

    constructor(neurons: IHiveMindNeuron[], certaintyThreshold: number) {
        this.neurons = neurons;
        this.certaintyThreshold = certaintyThreshold;
    }

    public findMatch(input: string[], locale: string, context: any): INeuronResponse {
        let potentialResponse = null;
        let maxCertainty = 0;

        for (let i = 0; i < this.neurons.length; i++) {
            const response = this.neurons[i].process(input, locale, context);

            if (response.hasAnswer()) {
                if (response.getCertainty() >= this.certaintyThreshold) {
                    this.placeNeuronToTop(i);
                    return response;
                }

                if (response.getCertainty() > maxCertainty) {
                    potentialResponse = response;
                    maxCertainty = response.getCertainty();
                }
            }
        }

        return potentialResponse == null ? new Silence() : potentialResponse;
    }

    private placeNeuronToTop(i: number) {
        if (i > 0) {
            const swap = this.neurons[0];
            this.neurons[0] = this.neurons[i];
            this.neurons[i] = swap;
        }
    }
}
