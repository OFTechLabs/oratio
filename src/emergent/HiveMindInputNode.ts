import {IHiveMindNeuron} from './HiveMindNeurons';
import {UserInput} from "./BasicUserInput";

export class HiveMindInputNode {
    constructor(private _previous: HiveMindInputNode | null,
                private _neuronHandled: IHiveMindNeuron,
                private _input: UserInput,) {
    }

    get previous(): HiveMindInputNode | null {
        return this._previous;
    }

    get neuronHandled(): IHiveMindNeuron {
        return this._neuronHandled;
    }

    get input(): UserInput {
        return this._input;
    }
}
