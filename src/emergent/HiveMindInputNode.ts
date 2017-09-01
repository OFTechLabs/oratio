import {IHiveMindNeuron} from './HiveMindNeurons';
import {UserInput} from "./BasicUserInput";

export class HiveMindInputNode {
    constructor(private _previous: HiveMindInputNode | null,
                private _neuronsHandled: IHiveMindNeuron[],
                private _mostCertainNeuron: IHiveMindNeuron,
                private _input: UserInput,) {
    }

    get previous(): HiveMindInputNode | null {
        return this._previous;
    }

    get neuronsHandled(): IHiveMindNeuron[] {
        return this._neuronsHandled;
    }

    get mostCertainNeuron(): IHiveMindNeuron {
        return this._mostCertainNeuron;
    }

    get input(): UserInput {
        return this._input;
    }
}
