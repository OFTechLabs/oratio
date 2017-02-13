import {NeuronResponse} from "./NeuronResponse";

export class SimpleResponse implements NeuronResponse {

    private _response: string;

    constructor(response: string) {
        this._response = response;
    }

    get response(): string {
        return this._response;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
