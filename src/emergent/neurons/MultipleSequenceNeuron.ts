import {IHiveMindNeuron} from "./HiveMindNeuron";
import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {NeuronResponse} from "./responses/NeuronResponse";
import {Silence} from "./responses/Silence";
import {SimpleResponse} from "./responses/SimpleResponse";

export class MultipleSequenceNeuron implements IHiveMindNeuron {

    private knownWords: string[];
    private knownTwoWordSequences: string[];
    private knownThreeWordSequences: string[];
    private knownFourWordSequences: string[];
    private response: string;

    constructor(knownWords: string[],
                knownTwoWordSequences: string[],
                knownThreeWordSequences: string[],
                knownFourWordSequences: string[],
                response: string) {
        this.knownWords = knownWords;
        this.knownTwoWordSequences = knownTwoWordSequences;
        this.knownThreeWordSequences = knownThreeWordSequences;
        this.knownFourWordSequences = knownFourWordSequences;
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

        for (let i = 0; i < this.knownTwoWordSequences.length; i++) {
            const sequence = this.knownTwoWordSequences[i];
            for (let j = 0; j < (input.length - 1); j++) {
                const sequenceTogether = input[j] + input[j + 1];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        for (let i = 0; i < this.knownThreeWordSequences.length; i++) {
            const sequence = this.knownThreeWordSequences[i];
            for (let j = 0; j < (input.length - 2); j++) {
                const sequenceTogether = input[j] + input[j + 1] + input[j + 2];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        for (let i = 0; i < this.knownFourWordSequences.length; i++) {
            const sequence = this.knownFourWordSequences[i];
            for (let j = 0; j < (input.length - 3); j++) {
                const sequenceTogether = input[j] + input[j + 1] + input[j + 2] + input[j + 3];

                if (LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)) {
                    return new SimpleResponse(this.response, []);
                }
            }
        }

        return new Silence();
    }
}
