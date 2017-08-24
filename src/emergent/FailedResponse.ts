import {IHiveResponse, ISingleResponse} from './HiveResponse';


export class FailedResponse implements ISingleResponse {
    constructor(private _response: string) {
    }

    public response(): string {
        return this._response;
    }
}

export class FailedResponses implements IHiveResponse {

    private _response: FailedResponse;

    constructor(response: string) {
        this._response = new FailedResponse(response);
    }

    public responses(): ISingleResponse[] {
        return [];
    }

    public single(): ISingleResponse {
        return this._response;
    }

    public response(): string {
        return this.single().response();
    }
}
