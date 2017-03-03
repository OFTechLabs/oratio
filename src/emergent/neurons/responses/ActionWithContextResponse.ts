import {ActionResponse} from "./ActionResponse";

export class ActionWithContextResponse extends ActionResponse {

    private _context: any;

    constructor(response: string, params: string[], certainty: number, action: () => void, context: any) {
        super(response, params, certainty, action);
        this._context = context;
    }

    get context(): any {
        return this._context;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
