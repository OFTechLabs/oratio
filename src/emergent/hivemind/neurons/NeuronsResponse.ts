import { IHiveMindNeuron } from './HiveMindNeurons';
import { INeuronResponse } from '../../neurons/responses/SimpleResponse';

export interface ISingleNeuronsResponse {
    getFiredNeuron(): IHiveMindNeuron;

    getResponse(): INeuronResponse;
}

export interface INeuronsResponse {
    getResponses(): ISingleNeuronsResponse[]

    getMostCertainResponse(): ISingleNeuronsResponse;
}

export class SingleNeuronsResponse implements ISingleNeuronsResponse {
    private _firedNeuron: IHiveMindNeuron;
    private _response: INeuronResponse;

    constructor(firedNeuron: IHiveMindNeuron, response: INeuronResponse) {
        this._firedNeuron = firedNeuron;
        this._response = response;
    }

    public getFiredNeuron(): IHiveMindNeuron {
        return this._firedNeuron;
    }

    public getResponse(): INeuronResponse {
        return this._response;
    }
}

export class NeuronsResponse implements INeuronsResponse {

    constructor(private _responses: ISingleNeuronsResponse[],
                private _mostCertainResponse: ISingleNeuronsResponse) {
    }

    getResponses(): ISingleNeuronsResponse[] {
        return this._responses;
    }

    getMostCertainResponse(): ISingleNeuronsResponse {
        return this._mostCertainResponse;
    }
}
