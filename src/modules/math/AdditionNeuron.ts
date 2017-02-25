import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {BaseMathNeuron} from "./BaseMathNeuron";

export class AdditionNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["add", "+", "plus"];

    public process(words: string[], locale: string, context: string): NeuronResponse {
        return (new BaseMathNeuron(
            AdditionNeuron.KNOWN_WORDS,
            "otario.math.addition",
            (a, b) => a + b
        )).process(words, locale, context);
    }
}
