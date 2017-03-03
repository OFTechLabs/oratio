import {SimpleResponse} from "./SimpleResponse";

export class ActionResponse extends SimpleResponse {

    private _action: () => void;

    constructor(response: string, params: string[], certainty: number, action: () => void) {
        super(response, params, certainty);
        this._action = action;
    }

    get action(): () => void {
        return this._action;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
