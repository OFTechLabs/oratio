import {SimpleResponse} from "./SimpleResponse";

export class ActionResponse extends SimpleResponse {

    private _action: () => void;

    constructor(response: string, action: () => void) {
        super(response);
        this._action = action;
    }

    get action(): () => void {
        return this._action;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
