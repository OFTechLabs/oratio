import {LanguageUtil} from '../language/LanguageUtil';
import {SilenceNeuron} from './SilenceNeuron';
import {Locale} from "../language/i18n/BasicLocale";
import { HiveMindInputNode } from './hivemind/HiveMindInputNode';
import { IHiveMindNeuron } from './hivemind/neurons/HiveMindNeurons';
import { INeuronHints } from './NeuronHints';

export interface RequestContext {
    previousInput(): HiveMindInputNode | null;

    clientModel(): any;

    previousNeuronsHandled(): IHiveMindNeuron[];

    mostCertainNeuronHandled(): IHiveMindNeuron;

    hints(): INeuronHints;

    hasPreviousInput(): boolean;

    locale(): Locale;
}

export class BasicRequestContext implements RequestContext {

    constructor(private _previousInput: HiveMindInputNode | null,
                private _clientModel: any,
                private _locale: Locale,
                private _neuronHints: INeuronHints) {
    }

    public previousInput(): HiveMindInputNode | null {
        return this._previousInput;
    }

    public clientModel(): any {
        return this._clientModel;
    }

    public previousNeuronsHandled(): IHiveMindNeuron[] {
        if (this.hasPreviousInput() && this._previousInput !== null) {
            return this._previousInput.neuronsHandled;
        }

        return [];
    }

    public mostCertainNeuronHandled(): IHiveMindNeuron {
        if (this.hasPreviousInput() && this._previousInput !== null) {
            return this._previousInput.mostCertainNeuron;
        }

        return SilenceNeuron.INSTANCE;
    }

    public hasPreviousInput(): boolean {
        return LanguageUtil.isDefined(this._previousInput);
    }

    public locale(): Locale {
        return this._locale;
    }

    public hints(): INeuronHints {
        return this._neuronHints;
    }
}
