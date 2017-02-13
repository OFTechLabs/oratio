import {BaseMathNeuron} from "./BaseMathNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";

export class SubtractionNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["substract", "-", "minus"];

    public process(words: string[], context: string): NeuronResponse {
        return (new BaseMathNeuron(
            SubtractionNeuron.KNOWN_WORDS,
            "otario.math.subtraction",
            (a, b) => a - b
        )).process(words, context);
    }
}
