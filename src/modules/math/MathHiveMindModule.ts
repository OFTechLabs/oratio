import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { AdditionNeuron } from './AdditionNeuron';
import { DivisionNeuron } from './DivisionNeuron';
import { MultiplicationNeuron } from './MultiplicationNeuron';
import { SubstractionNeuron } from './SubstractionNeuron';
import { IHiveMindModule } from '../HiveMindModule';

export class MathHiveMindModule implements IHiveMindModule {

    public static MATH_HIVE_MIND_MODULE: MathHiveMindModule = new MathHiveMindModule([
        new AdditionNeuron(),
        new DivisionNeuron(),
        new MultiplicationNeuron(),
        new SubstractionNeuron(),
    ]);

    private constructor(private _neurons: IHiveMindNeuron[]) {
    }

    get neurons(): IHiveMindNeuron[] {
        return this._neurons;
    }
}
