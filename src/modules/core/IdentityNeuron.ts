import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";

export class IdentityNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["identity"];
    private static KNOWN_THREE_WORD_SEQUENCES: string[] = ["whoareyou", "whatareyou"];

    public process(words: string[], locale: string, context: string): NeuronResponse {
        return (new MultipleSequenceNeuron(
            IdentityNeuron.KNOWN_WORDS,
            [],
            IdentityNeuron.KNOWN_THREE_WORD_SEQUENCES,
            [],
            "oratio.core.identity"))
            .process(words, locale, context);
    }

}
