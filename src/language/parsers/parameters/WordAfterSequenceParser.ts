import {LevenshteinDistanceMatcher} from "../../words/LevenshteinDistanceMatcher";

export interface IParameterParser {
    parse(words: string[]): string[];
}

export class WordAfterSequenceParser implements IParameterParser {

    private sequences: string[][];

    constructor(sequences: string[][]) {
        this.sequences = sequences;
    }

    public parse(words: string[]): string[] {
        for (const sequence of this.sequences) {
            for (let j = 0; j < (words.length - sequence.length); j++) {
                for (let k = 0; k < sequence.length; k++) {
                    const word = words[j + k];
                    const sequenceWord = sequence[k];
                    if (LevenshteinDistanceMatcher.MATCHER.matches(word, sequenceWord)) {
                        if (k === sequence.length - 1) {
                            return [words[j + k + 1]];
                        }
                    } else {
                        k = sequence.length + 1;
                    }
                }

            }
        }

        return [];
    }
}
