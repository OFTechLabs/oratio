import {NeuronResponse} from "./responses/NeuronResponse";

export interface IHiveMindNeuron {

    process(words: string[], locale: string, context: string): NeuronResponse;

}