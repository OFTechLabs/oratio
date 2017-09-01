import { NeuronHints } from './NeuronHints';

export class NeuronHintsBuilder {

    private _isAllowedToRunAction: boolean;
    private _isAllowedToMakeCallOverNetwork: boolean;

    private constructor() {
        this._isAllowedToRunAction = false;
        this._isAllowedToMakeCallOverNetwork = true;
    }

    public static create(): NeuronHintsBuilder {
        return new NeuronHintsBuilder();
    }

    public withIsAllowedToRunAction(isAllowedToRunAction: boolean): NeuronHintsBuilder {
        this._isAllowedToRunAction = isAllowedToRunAction;
        return this;
    }

    public withIsAllowedToMakeCallOverNetwork(isAllowedToMakeCallOverNetwork: boolean): NeuronHintsBuilder {
        this._isAllowedToMakeCallOverNetwork = isAllowedToMakeCallOverNetwork;
        return this;
    }

    public turnOnTrueEmergence(): NeuronHintsBuilder {
        this._isAllowedToRunAction = true;
        this._isAllowedToMakeCallOverNetwork = true;
        return this;
    }

    public build(): NeuronHints {
        return new NeuronHints(
            this._isAllowedToRunAction,
            this._isAllowedToMakeCallOverNetwork
        );
    }
}
