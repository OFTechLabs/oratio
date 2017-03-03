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

    constructor(neurons: IHiveMindNeuron[]) {
        this.neurons = neurons;
    }

    public findMatch(input: string[], locale: string, context: any): INeuronResponse {
        for (let i = 0; i < this.neurons.length; i++) {
            const response = this.neurons[i].process(input, locale, context);

            if (response.hasAnswer()) {
                if (i > 0) {
                    const swap = this.neurons[i - 1];
                    this.neurons[i - 1] = this.neurons[i];
                    this.neurons[i] = swap;
                }

                return response;

            }
        }

        return new Silence();
    }
}
