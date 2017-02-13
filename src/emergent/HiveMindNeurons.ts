import {HiveMindNeuron} from "./neurons/HiveMindNeuron";
import {NeuronResponse} from "./neurons/responses/NeuronResponse";
import {Silence} from "./neurons/responses/Silence";

export interface IHiveMindNeurons {

    findMatch(input: string[], context: string): NeuronResponse;

    registerNeurons(toAdd: HiveMindNeuron[]): void;

}

export class BasicHiveMindNeurons implements IHiveMindNeurons {

    private neurons: HiveMindNeuron[];

    constructor(neurons: HiveMindNeuron[]) {
        this.neurons = neurons;
    }

    public findMatch(input: string[], context: string): NeuronResponse {
        for (let i = 0; i < this.neurons.length; i++) {
            const response = this.neurons[i].process(input, context);

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

    public registerNeurons(toAdd: HiveMindNeuron[]): void {
        this.neurons = this.neurons.concat(toAdd);
    }
}
