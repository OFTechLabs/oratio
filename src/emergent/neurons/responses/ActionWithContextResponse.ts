import {ActionResponse} from './ActionResponse';

export class ActionWithContextResponse extends ActionResponse {
    constructor(response: string,
                params: string[],
                certainty: number,
                action: () => void,
                context: any,) {
        super(response, params, certainty, action);
        this._context = context;
    }

    private _context: any;

    get context(): any {
        return this._context;
    }

    public hasAnswer(): boolean {
        return true;
    }
}
