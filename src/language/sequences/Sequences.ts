import { Sequence } from "./Sequence"

export class Sequences {
  constructor(sequences: Sequence[]) {
    this._sequences = sequences
  }

  private _sequences: Sequence[]

  public get sequences(): Sequence[] {
    return this._sequences
  }

  public get singleWord(): Sequence[] {
    return this._sequences.filter((sequence: Sequence) => sequence.length === 1)
  }

  public get twoWords(): Sequence[] {
    return this._sequences.filter((sequence: Sequence) => sequence.length === 2)
  }

  public get threeWords(): Sequence[] {
    return this._sequences.filter((sequence: Sequence) => sequence.length === 3)
  }

  public get fourWords(): Sequence[] {
    return this._sequences.filter((sequence: Sequence) => sequence.length === 4)
  }
}
