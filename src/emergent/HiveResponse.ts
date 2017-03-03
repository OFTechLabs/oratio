export interface IHiveResponse {
    response(): string;
}

export class UnderstoodResponse implements IHiveResponse {

    constructor(private _response: string,
                private _params: string[],
                private _certainty: number,
                private _action: () => void,
                private _context: any) {
    }

    public response(): string {
        return this._response;
    }

    get params(): string[] {
        return this._params;
    }

    get certainty(): number {
        return this._certainty;
    }

    get action(): () => void {
        return this._action;
    }

    get context(): any {
        return this._context;
    }
}
