import {IHiveMindNeuron} from "./HiveMindNeurons";

export class HiveMindInputNode {

    private _previous: HiveMindInputNode;
    private _neuronHandled: IHiveMindNeuron;
    private _input: string[];

    constructor(previous: HiveMindInputNode, neuronHandled: IHiveMindNeuron, input: string[]) {
        this._previous = previous;
        this._neuronHandled = neuronHandled;
        this._input = input;
    }

    get previous(): HiveMindInputNode {
        return this._previous;
    }

    get neuronHandled(): IHiveMindNeuron {
        return this._neuronHandled;
    }

    get input(): string[] {
        return this._input;
    }
}
