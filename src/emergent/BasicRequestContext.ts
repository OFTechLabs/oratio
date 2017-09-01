import {HiveMindInputNode} from './HiveMindInputNode';
import {LanguageUtil} from '../language/LanguageUtil';
import {IHiveMindNeuron} from './HiveMindNeurons';
import {SilenceNeuron} from './SilenceNeuron';
import {Locale} from "../language/i18n/BasicLocale";

export interface RequestContext {
    previousInput(): HiveMindInputNode | null;

    clientModel(): any;

    previousNeuronsHandled(): IHiveMindNeuron[];

    mostCertainNeuronHandled(): IHiveMindNeuron;

    hasPreviousInput(): boolean;

    locale(): Locale;
}

export class BasicRequestContext implements RequestContext {


    constructor(private _previousInput: HiveMindInputNode | null,
                private _clientModel: any,
                private _locale: Locale) {
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
}
