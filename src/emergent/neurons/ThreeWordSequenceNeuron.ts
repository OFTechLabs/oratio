import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {SimpleResponse, INeuronResponse} from "./responses/SimpleResponse";
import {Silence} from "./responses/Silence";
import {IHiveMindNeuron} from "../HiveMindNeurons";

export class ThreeWordSequenceNeuron implements IHiveMindNeuron {

    private knownThreeWordSequences: string[];
    private response: string;

    constructor(knownThreeWordSequences: string[], response: string) {
        this.knownThreeWordSequences = knownThreeWordSequences;
        this.response = response;
    }

    public process(input: string[], locale: string, context: string): INeuronResponse {
        for (const sequence of this.knownThreeWordSequences) {
            for (let j = 0; j < (input.length - 2); j++) {
                const sequenceTogether = input[j] + input[j + 1] + input[j + 2];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        return new Silence();
    }
}
