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

    /**
     * Tell neurons if they can or can not run actions on their own.
     * @param {boolean} isAllowedToRunAction whether or not neurons can run actions on their own
     * @returns {NeuronHintsBuilder}
     */
    public withIsAllowedToRunAction(isAllowedToRunAction: boolean): NeuronHintsBuilder {
        this._isAllowedToRunAction = isAllowedToRunAction;
        return this;
    }

    /**
     * Tell neurons if they can or can not make network calls
     * @param {boolean} isAllowedToMakeCallOverNetwork whether or not neurons can make network calls
     * @returns {NeuronHintsBuilder}
     */
    public withIsAllowedToMakeCallOverNetwork(isAllowedToMakeCallOverNetwork: boolean): NeuronHintsBuilder {
        this._isAllowedToMakeCallOverNetwork = isAllowedToMakeCallOverNetwork;
        return this;
    }

    /**
     * A preset to allow for true emergence, this means neurons will be told they can do as they see fit with any given
     * input, there will be no restrictions.
     * @returns {NeuronHintsBuilder}
     */
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
