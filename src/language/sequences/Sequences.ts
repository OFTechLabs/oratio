import {Sequence} from './Sequence';
import {LanguageUtil} from '../LanguageUtil';

export class Sequences {
    constructor(sequences: Sequence[]) {
        this._sequences = sequences;
    }

    private _sequences: Sequence[];

    public get sequences(): Sequence[] {
        return this._sequences;
    }

    public get singleWord(): Sequence[] {
        return this.sequence(1);
    }

    public get twoWords(): Sequence[] {
        return this.sequence(2);
    }

    public get threeWords(): Sequence[] {
        return this.sequence(3);
    }

    public get fourWords(): Sequence[] {
        return this.sequence(4);
    }

    public sequence(numberOfWords: number): Sequence[] {
        return this._sequences.filter(
            (sequence: Sequence) => LanguageUtil.isDefined(sequence) && sequence.length === numberOfWords,
        );
    }
}
