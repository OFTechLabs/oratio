export class Sequence {
  constructor(length: number, sequence: string) {
    this._length = length
    this._sequence = sequence
  }

  private _length: number

  public get length(): number {
    return this._length
  }

  private _sequence: string

  public get sequence(): string {
    return this._sequence
  }

  public get withoutSpaces(): string {
    return this._sequence.replace(" ", "")
  }
}
