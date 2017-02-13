import {HiveMindNeuron} from "../../neurons/HiveMindNeuron";
import {NeuronResponse} from "../../neurons/responses/NeuronResponse";
import {Silence} from "../../neurons/responses/Silence";
import {LevenshteinDistanceMatcher} from "../../../language/words/LevenshteinDistanceMatcher";
import {SimpleResponse} from "../../neurons/responses/SimpleResponse";

export class IdentityNeuron implements HiveMindNeuron {

    private static KNOWN_WORDS : string [] = ["identity"];
    private static KNOWN_THREE_WORD_SEQUENCES : string[] = ["whoareyou", "whatareyou"];

    process(words: string[], context: string): NeuronResponse {
        for (let i = 0; i < IdentityNeuron.KNOWN_WORDS.length; i++) {
            const knownWord = IdentityNeuron.KNOWN_WORDS[i];
            for (let j = 0; j < words.length; j++) {
                if (LevenshteinDistanceMatcher.MATCHER.matches(words[j], knownWord)) {
                    return new SimpleResponse("oratio.identity", []);
                }
            }
        }
        for (let i = 0; i < IdentityNeuron.KNOWN_THREE_WORD_SEQUENCES.length; i++) {
            const sequence = IdentityNeuron.KNOWN_THREE_WORD_SEQUENCES[i];
            for (let j = 0; j < (words.length - 2); j++) {
                const sequenceTogether = words[j] + words[j+1] + words[j+2];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse("oratio.identity", []);
                }
            }
        }

        return new Silence();
    }

}
