import { IHiveResponse } from "./HiveResponse"

export class FailedResponse implements IHiveResponse {
  constructor(private _response: string) {}

  public response(): string {
    return this._response
  }
}
