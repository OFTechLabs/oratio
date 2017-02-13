import {NeuronResponse} from "./NeuronResponse";

export class SimpleResponse implements NeuronResponse {

    private _response: string;
    private _params: string[];

    constructor(response: string, params: string[]) {
        this._response = response;
        this._params = params;
    }

    get response(): string {
        return this._response;
    }

    get params(): string[] {
        return this._params;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
