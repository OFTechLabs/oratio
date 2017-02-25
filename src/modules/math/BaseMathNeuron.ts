import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {Silence} from "../../emergent/neurons/responses/Silence";
import {LevenshteinDistanceMatcher} from "../../language/words/LevenshteinDistanceMatcher";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";

export class BaseMathNeuron implements IHiveMindNeuron {

    private knownOperators: string[];
    private response: string;
    private apply: (a: number, b: number) => number;

    constructor(
        knownOperators: string[],
        response: string,
        apply: (a: number, b: number) => number) {
        this.knownOperators = knownOperators;
        this.response = response;
        this.apply = apply;
    }

    public process(words: string[], locale: string, context: string): NeuronResponse {
        for (let i = 0; i < words.length - 1; i++) {
            const word = words[i];
            for (let j = 0; j < this.knownOperators.length; j++) {
                if (LevenshteinDistanceMatcher.MATCHER.matches(word, this.knownOperators[j])) {
                    const possibleNumberOne = parseFloat(words[i - 1]);
                    const possibleNumberTwo = parseFloat(words[i + 1]);
                    const possibleNumberThree = parseFloat(words[i + 2]);
                    const possibleNumberFour = parseFloat(words[i + 3]);

                    if (this.isNumeric(possibleNumberOne) && this.isNumeric(possibleNumberTwo)) {
                        return new SimpleResponse(
                            this.response,
                            ["" + this.roundToTwo(this.apply(possibleNumberOne, possibleNumberTwo))]
                        );
                    } else if (this.isNumeric(possibleNumberTwo) && this.isNumeric(possibleNumberThree)) {
                        return new SimpleResponse(
                            this.response,
                            ["" + this.roundToTwo(this.apply(possibleNumberTwo, possibleNumberThree))]
                        );
                    } else if (this.isNumeric(possibleNumberTwo) && this.isNumeric(possibleNumberFour)) {
                        return new SimpleResponse(
                            this.response,
                            ["" + this.roundToTwo(this.apply(possibleNumberTwo, possibleNumberFour))]
                        );
                    }
                }
            }
        }

        return new Silence();
    }

    private isNumeric(n: number): boolean {
        return !isNaN(n) && isFinite(n);
    }

    private roundToTwo(num: number): number {
        return +(Math.round(<any> (num + "e+2")) + "e-2");
    }
}
