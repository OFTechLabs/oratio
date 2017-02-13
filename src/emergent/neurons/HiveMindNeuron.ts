import {NeuronResponse} from "./responses/NeuronResponse";

export interface HiveMindNeuron {

    process(input: string, context: string) : NeuronResponse;

}