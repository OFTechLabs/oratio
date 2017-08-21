import {Sequences} from './Sequences';
import {Sequence} from './Sequence';
import {LanguageUtil} from '../LanguageUtil';

export class SequenceParser {
    public static parse(sequences: string[]): Sequences {
        if (!LanguageUtil.isSequence(sequences)) {
            return new Sequences([]);
        }

        return new Sequences(
            sequences.map(
                (sequence: string) =>
                    new Sequence(sequence.split(' ').length, sequence),
            ),
        );
    }
}
