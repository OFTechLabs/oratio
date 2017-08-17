import { HiveMindInputNode } from "./HiveMindInputNode"
import { LanguageUtil } from "../language/LanguageUtil"
import { IHiveMindNeuron } from "./HiveMindNeurons"
import { SilenceNeuron } from "./SilenceNeuron"

export class RequestContext {
  constructor(previousInput: HiveMindInputNode | null, clientModel: any) {
    this._previousInput = previousInput
    this._clientModel = clientModel
  }

  private _previousInput: HiveMindInputNode | null

  get previousInput(): HiveMindInputNode | null {
    return this._previousInput
  }

  private _clientModel: any

  get clientModel(): any {
    return this._clientModel
  }

  get previousNeuronHandled(): IHiveMindNeuron {
    if (this.hasPreviousInput() && this._previousInput !== null) {
      return this._previousInput.neuronHandled
    }

    return SilenceNeuron.INSTANCE
  }

  public hasPreviousInput(): boolean {
    return LanguageUtil.isDefined(this._previousInput)
  }
}
