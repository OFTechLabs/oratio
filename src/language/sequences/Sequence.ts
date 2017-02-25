export class Sequence {

    private _length: number;
    private _sequence: string;

    constructor(length: number, sequence: string) {
        this._length = length;
        this._sequence = sequence;
    }

    public get length(): number {
        return this._length;
    }

    public get sequence(): string {
        return this._sequence;
    }

    public get withoutSpaces(): string {
        return this._sequence.replace(" ", "");
    }
}
