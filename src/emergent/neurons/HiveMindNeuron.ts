import {NeuronResponse} from "./responses/NeuronResponse";

export interface IHiveMindNeuron {

    process(words: string[], context: string) : NeuronResponse;

}