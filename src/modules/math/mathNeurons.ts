import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {AdditionNeuron} from "./AdditionNeuron";
import {DivisionNeuron} from "./DivisionNeuron";
import {MultiplicationNeuron} from "./MultiplicationNeuron";
import {SubstractionNeuron} from "./SubstractionNeuron";

export * from "./AdditionNeuron";
export * from "./SubstractionNeuron";
export * from "./MultiplicationNeuron";
export * from "./DivisionNeuron";

export class MathNeurons {
    public static getMathNeurons(): IHiveMindNeuron[] {
        return [
            new AdditionNeuron(),
            new DivisionNeuron(),
            new MultiplicationNeuron(),
            new SubstractionNeuron(),
        ];
    }
}
