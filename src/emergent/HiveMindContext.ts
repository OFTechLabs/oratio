import {HiveMindInputNode} from "./HiveMindInputNode";
import {LanguageUtil} from "../language/LanguageUtil";

export class HiveMindContext {

    private _previousInput: HiveMindInputNode;
    private _clientModel: any;

    constructor(previousInput: HiveMindInputNode, clientModel: any) {
        this._previousInput = previousInput;
        this._clientModel = clientModel;
    }

    public hasPreviousInput(): boolean {
        return LanguageUtil.isDefined(this._previousInput);
    }

    get previousInput(): (HiveMindInputNode|null) {
        return this._previousInput;
    }

    get clientModel(): any {
        return this._clientModel;
    }
}
