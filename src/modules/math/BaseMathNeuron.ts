import {Silence} from '../../emergent/neurons/responses/Silence';
import {LevenshteinDistanceMatcher} from '../../language/words/LevenshteinDistanceMatcher';
import {INeuronResponse, SimpleResponse,} from '../../emergent/neurons/responses/SimpleResponse';
import {NumberOfKnownWordsCertaintyCalculator} from '../../language/sequences/NumberOfKnownWordsCertaintyCalculator';
import {RequestContext} from "../../emergent/BasicRequestContext";
import {UserInput} from "../../emergent/BasicUserInput";
import { IHiveMindNeuron } from '../../emergent/hivemind/neurons/HiveMindNeurons';

export class BaseMathNeuron implements IHiveMindNeuron {

    constructor(private knownOperators: string[],
                private response: string,
                private apply: (a: number, b: number) => number,) {
    }

    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        let index = 0;
        for (const word of input.words()) {
            for (const knownOperator of this.knownOperators) {
                if (
                    LevenshteinDistanceMatcher.MATCHER.matches(
                        word,
                        knownOperator,
                    )
                ) {
                    const possibleNumberOne = parseFloat(input.words()[index - 1]);
                    const possibleNumberTwo = parseFloat(input.words()[index + 1]);
                    const possibleNumberThree = parseFloat(input.words()[index + 2]);
                    const possibleNumberFour = parseFloat(input.words()[index + 3]);

                    if (
                        this.isNumeric(possibleNumberOne) &&
                        this.isNumeric(possibleNumberTwo)
                    ) {
                        return Promise.resolve(
                            new SimpleResponse(
                                this.response,
                                [
                                    '' +
                                    this.roundToTwo(
                                        this.apply(
                                            possibleNumberOne,
                                            possibleNumberTwo,
                                        ),
                                    ),
                                ],
                                NumberOfKnownWordsCertaintyCalculator.calculate(
                                    3,
                                    input.words(),
                                ),
                            ),
                        );
                    } else if (
                        this.isNumeric(possibleNumberTwo) &&
                        this.isNumeric(possibleNumberThree)
                    ) {
                        return Promise.resolve(
                            new SimpleResponse(
                                this.response,
                                [
                                    '' +
                                    this.roundToTwo(
                                        this.apply(
                                            possibleNumberTwo,
                                            possibleNumberThree,
                                        ),
                                    ),
                                ],
                                NumberOfKnownWordsCertaintyCalculator.calculate(
                                    3,
                                    input.words(),
                                ),
                            ),
                        );
                    } else if (
                        this.isNumeric(possibleNumberTwo) &&
                        this.isNumeric(possibleNumberFour)
                    ) {
                        return Promise.resolve(
                            new SimpleResponse(
                                this.response,
                                [
                                    '' +
                                    this.roundToTwo(
                                        this.apply(
                                            possibleNumberTwo,
                                            possibleNumberFour,
                                        ),
                                    ),
                                ],
                                NumberOfKnownWordsCertaintyCalculator.calculate(
                                    3,
                                    input.words(),
                                ),
                            ),
                        );
                    }
                }
            }
            index++;
        }

        return Promise.resolve(new Silence());
    }

    private isNumeric(n: number): boolean {
        return !isNaN(n) && isFinite(n);
    }

    private roundToTwo(num: number): number {
        return +(Math.round((num + 'e+2') as any) + 'e-2');
    }
}
