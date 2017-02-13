import {HiveMindNeuron} from "./HiveMindNeuron";
import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {NeuronResponse} from "./responses/NeuronResponse";
import {Silence} from "./responses/Silence";
import {SimpleResponse} from "./responses/SimpleResponse";

export class SingleWordNeuron implements HiveMindNeuron {

    private knownWords: string[];
    private response: string;

    constructor(knownWords: string[], response: string) {
        this.knownWords = knownWords;
        this.response = response;
    }

    public process(input: string[], context: string): NeuronResponse {
        for (let i = 0; i < this.knownWords.length; i++) {
            const knownWord = this.knownWords[i];
            for (let j = 0; j < input.length; j++) {
                if (LevenshteinDistanceMatcher.MATCHER.matches(input[j], knownWord)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        return new Silence();
    }
}
