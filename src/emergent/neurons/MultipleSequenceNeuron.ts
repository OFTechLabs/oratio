import {LevenshteinDistanceMatcher} from '../../language/words/LevenshteinDistanceMatcher';
import {Silence} from './responses/Silence';
import {INeuronResponse, SimpleResponse} from './responses/SimpleResponse';
import {NumberOfKnownWordsCertaintyCalculator} from '../../language/sequences/NumberOfKnownWordsCertaintyCalculator';
import {Sequences} from '../../language/sequences/Sequences';
import {RequestContext} from "../BasicRequestContext";
import {UserInput} from "../BasicUserInput";
import { IHiveMindNeuron } from '../hivemind/neurons/HiveMindNeurons';

export class MultipleSequenceNeuron implements IHiveMindNeuron {

    constructor(private sequences: Sequences,
                private response: string) {
    }

    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        let maxCertainties: number[] = [];


        for (let numberOfWords = 1; numberOfWords <= input.numberOfWords(); numberOfWords++) {
            maxCertainties.push(this.processSequence(
                input.words(),
                numberOfWords,
            ));
        }

        const maxCertainty = maxCertainties.reduce((a, b) => a > b ? a : b, 0);
        if (maxCertainty > 0) {
            return Promise.resolve(
                new SimpleResponse(this.response, [], maxCertainty),
            );
        }

        return Promise.resolve(new Silence());
    }

    private processSequence(input: string[], numberOfWords: number): number {
        let maxCertainty = 0;

        for (const sequence of this.sequences.sequence(numberOfWords)) {
            for (let j = 0; j < input.length - (numberOfWords - 1); j++) {
                const sequenceTogether = input.slice(j, j + (numberOfWords)).reduce((a, b) => a + b, "");
                if (
                    LevenshteinDistanceMatcher.MATCHER.matches(
                        sequenceTogether,
                        sequence.withoutSpaces,
                    )
                ) {

                    let newMaxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
                        numberOfWords,
                        input,
                    );
                    if (newMaxCertainty > maxCertainty) {
                        maxCertainty = newMaxCertainty;
                    }
                }
            }
        }

        return maxCertainty;
    }
}
