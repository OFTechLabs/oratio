export interface UserInput {
    rawInput(): string;

    words(): string[];

    numberOfWords(): number;
}

export class BasicUserInput implements UserInput {

    private _words: string[];

    constructor(private _rawInput: string) {
        this._words = _rawInput.split(' ')
    }

    rawInput(): string {
        return this._rawInput;
    }

    words(): string[] {
        return this._words;
    }

    numberOfWords(): number {
        return this.words().length;
    }
}
