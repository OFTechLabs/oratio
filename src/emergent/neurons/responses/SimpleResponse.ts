export interface INeuronResponse {
  hasAnswer(): boolean;

  getCertainty(): number;
}

export class SimpleResponse implements INeuronResponse {
  private _certainty: number;

  constructor(response: string, params: string[], certainty: number) {
    this._response = response;
    this._params = params;
    this._certainty = certainty;
  }

  private _response: string;

  get response(): string {
    return this._response;
  }

  private _params: string[];

  get params(): string[] {
    return this._params;
  }

  public getCertainty(): number {
    return this._certainty;
  }

  public hasAnswer(): boolean {
    return true;
  }

  public withParams(params: string[]): SimpleResponse {
    return new SimpleResponse(this._response, params, this._certainty);
  }

  public withCertainty(certainty: number): SimpleResponse {
    return new SimpleResponse(this._response, this._params, certainty);
  }
}
