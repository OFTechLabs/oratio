export interface INeuronHints {
    isAllowedToRunAction(): boolean;

    isAllowedToMakeCallOverNetwork(): boolean;
}

export class NeuronHints implements INeuronHints {

    constructor(
        private _isAllowedToRunAction: boolean,
        private _isAllowedToMakeCallOverNetwork: boolean,
        ) {
    }

    public isAllowedToRunAction(): boolean {
        return this._isAllowedToRunAction;
    }

    public isAllowedToMakeCallOverNetwork(): boolean {
        return this._isAllowedToMakeCallOverNetwork;
    }
}
