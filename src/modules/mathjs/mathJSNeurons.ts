import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {MathJSNeuron} from "./MathJSNeuron";
export * from "./MathJSNeuron"

export class MathJSNeurons {
    public static getMathJSNeurons(): IHiveMindNeuron[] {
        return [
            new MathJSNeuron(),
        ];
    }
}
