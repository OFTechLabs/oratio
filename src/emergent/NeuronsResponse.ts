import { IHiveMindNeuron } from "./HiveMindNeurons"
import { INeuronResponse } from "./neurons/responses/SimpleResponse"

export interface INeuronsResponse {
  getFiredNeuron(): IHiveMindNeuron

  getResponse(): INeuronResponse
}

export class NeuronsResponse {
  private _firedNeuron: IHiveMindNeuron
  private _response: INeuronResponse

  constructor(firedNeuron: IHiveMindNeuron, response: INeuronResponse) {
    this._firedNeuron = firedNeuron
    this._response = response
  }

  public getFiredNeuron(): IHiveMindNeuron {
    return this._firedNeuron
  }

  public getResponse(): INeuronResponse {
    return this._response
  }
}
