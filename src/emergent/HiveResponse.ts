export interface HiveResponse {
    response(): string
}

export class UnderstoodResponse implements HiveResponse {

    constructor(private _response: string,
                private _action: () => void,
                private _context: any) {
    }

    public response(): string {
        return this._response;
    }

    get action(): () => void {
        return this._action;
    }

    get context(): any {
        return this._context;
    }
}

export class FailedResponse implements HiveResponse {

    constructor(private _response: string) {
    }

    response(): string {
        return this._response;
    }
}
