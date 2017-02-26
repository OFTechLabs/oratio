import {IHiveMindNeuron} from "./HiveMindNeuron";
import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {NeuronResponse} from "./responses/NeuronResponse";
import {Silence} from "./responses/Silence";
import {SimpleResponse} from "./responses/SimpleResponse";

export class SingleWordNeuron implements IHiveMindNeuron {

    private knownWords: string[];
    private response: string;

    constructor(knownWords: string[], response: string) {
        this.knownWords = knownWords;
        this.response = response;
    }

    public process(input: string[], locale: string, context: string): NeuronResponse {
        for (const knownWord of this.knownWords) {
            for (const inputWord of input) {
                if (LevenshteinDistanceMatcher.MATCHER.matches(inputWord, knownWord)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        return new Silence();
    }
}
