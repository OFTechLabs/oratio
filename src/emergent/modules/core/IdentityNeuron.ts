import {HiveMindNeuron} from "../../neurons/HiveMindNeuron";
import {MultipleSequenceNeuron} from "../../neurons/MultipleSequenceNeuron";
import {NeuronResponse} from "../../neurons/responses/NeuronResponse";

export class IdentityNeuron implements HiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["identity"];
    private static KNOWN_THREE_WORD_SEQUENCES: string[] = ["whoareyou", "whatareyou"];

    public process(words: string[], context: string): NeuronResponse {
        return (new MultipleSequenceNeuron(
            IdentityNeuron.KNOWN_WORDS,
            [],
            IdentityNeuron.KNOWN_THREE_WORD_SEQUENCES,
            [],
            "oratio.identity"))
            .process(words, context);
    }

}
