import { IHiveMindNeuron } from "./HiveMindNeurons"

export class HiveMindInputNode {
  constructor(
    previous: HiveMindInputNode | null,
    neuronHandled: IHiveMindNeuron,
    input: string[]
  ) {
    this._previous = previous
    this._neuronHandled = neuronHandled
    this._input = input
  }

  private _previous: HiveMindInputNode | null

  get previous(): HiveMindInputNode | null {
    return this._previous
  }

  private _neuronHandled: IHiveMindNeuron

  get neuronHandled(): IHiveMindNeuron {
    return this._neuronHandled
  }

  private _input: string[]

  get input(): string[] {
    return this._input
  }
}
