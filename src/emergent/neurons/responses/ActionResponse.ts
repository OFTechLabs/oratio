import {SimpleResponse} from './SimpleResponse';

export class ActionResponse extends SimpleResponse {
    constructor(response: string,
                params: string[],
                certainty: number,
                action: () => void,) {
        super(response, params, certainty);
        this._action = action;
    }

    private _action: () => void;

    get action(): () => void {
        return this._action;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
