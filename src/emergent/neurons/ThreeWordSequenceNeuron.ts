import {HiveMindNeuron} from "./HiveMindNeuron";
import {NeuronResponse} from "./responses/NeuronResponse";
import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {SimpleResponse} from "./responses/SimpleResponse";
import {Silence} from "./responses/Silence";

export class ThreeWordSequenceNeuron implements HiveMindNeuron {

    private knownThreeWordSequences;
    private response;

    constructor(knownThreeWordSequences, response) {
        this.knownThreeWordSequences = knownThreeWordSequences;
        this.response = response;
    }

    process(input: string[], context: string): NeuronResponse {
        for (let i = 0; i < this.knownThreeWordSequences.length; i++) {
            const sequence = this.knownThreeWordSequences[i];
            for (let j = 0; j < (input.length - 2); j++) {
                const sequenceTogether = input[j] + input[j+1] + input[j+2];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        return new Silence();
    }
}
