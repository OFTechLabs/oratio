import {BaseMathNeuron} from "./BaseMathNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";

export class DivisionNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["divide", "/", "division"];

    public process(words: string[], context: string): NeuronResponse {
        return (new BaseMathNeuron(
            DivisionNeuron.KNOWN_WORDS,
            "otario.math.division",
            (a, b) => a / b
        )).process(words, context);
    }
}
