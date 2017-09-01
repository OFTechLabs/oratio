export interface IHiveResponse {
    responses(): ISingleResponse[];

    single(): ISingleResponse;

    response(): string;
}

export interface ISingleResponse {
    response(): string;
}

export class UnderstoodResponse implements ISingleResponse {
    constructor(private _response: string,
                private _params: string[],
                private _certainty: number,
                private _action: () => void,
                private _context: any,) {
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

    public response(): string {
        return this._response;
    }
}

export class UnderstoodResponses implements IHiveResponse {

    constructor(private _responses: UnderstoodResponse[]) {
    }

    public response(): string {
        return this.single().response();
    }

    public responses(): ISingleResponse[] {
        return this._responses;
    }

    public single(): ISingleResponse {
        return this._responses[0];
    }

}
