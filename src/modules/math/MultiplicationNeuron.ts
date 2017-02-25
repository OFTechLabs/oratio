import {BaseMathNeuron} from "./BaseMathNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";

export class MultiplicationNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["multiply", "*", "multiplication"];

    public process(words: string[], locale: string, context: string): NeuronResponse {
        return (new BaseMathNeuron(
            MultiplicationNeuron.KNOWN_WORDS,
            "otario.math.multiplication",
            (a, b) => a * b
        )).process(words, locale, context);
    }
}
