export interface IHiveResponse {
    response(): string;
}

export class UnderstoodResponse implements IHiveResponse {

    constructor(private _response: string,
                private _params: string[],
                private _action: () => void,
                private _context: any) {
    }

    public response(): string {
        return this._response;
    }

    get params(): string[] {
        return this._params;
    }

    get action(): () => void {
        return this._action;
    }

    get context(): any {
        return this._context;
    }
}

export class FailedResponse implements IHiveResponse {

    constructor(private _response: string) {
    }

    public response(): string {
        return this._response;
    }
}
