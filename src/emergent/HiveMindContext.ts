import {HiveMindInputNode} from "./HiveMindInputNode";

export class HiveMindContext {

    private _previousInput: HiveMindInputNode;
    private _clientModel: any;

    constructor(previousInput: HiveMindInputNode, clientModel: any) {
        this._previousInput = previousInput;
        this._clientModel = clientModel;
    }

    get previousInput(): HiveMindInputNode {
        return this._previousInput;
    }

    get clientModel(): any {
        return this._clientModel;
    }
}
