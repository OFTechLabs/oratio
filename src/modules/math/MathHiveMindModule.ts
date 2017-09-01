import { ILocalizedHiveMindModule } from '../HiveMindModule';
import { MathHiveMindTranslations } from './MathHiveMindTranslations';
import { AdditionNeuron } from './AdditionNeuron';
import { DivisionNeuron } from './DivisionNeuron';
import { MultiplicationNeuron } from './MultiplicationNeuron';
import { SubstractionNeuron } from './SubstractionNeuron';
import { IHiveMindNeuron } from '../../emergent/hivemind/neurons/HiveMindNeurons';

export const getMathNeurons: () => IHiveMindNeuron[] = () => {
    return [
        new AdditionNeuron(),
        new DivisionNeuron(),
        new MultiplicationNeuron(),
        new SubstractionNeuron(),
    ];
};

export class MathHiveMindModule implements ILocalizedHiveMindModule {

    public static MATH_HIVE_MIND_MODULE: MathHiveMindModule = new MathHiveMindModule(
        getMathNeurons(),
        {});

    private constructor(private _neurons: IHiveMindNeuron[],
                        private _translations: { [key: string]: string },) {
    }

    get neurons(): IHiveMindNeuron[] {
        return this._neurons;
    }

    get translations(): { [key: string]: string } {
        return this._translations;
    }

    public withTranslations(translations: MathHiveMindTranslations): MathHiveMindModule {
        return new MathHiveMindModule(
            this.neurons,
            translations,
        );
    }
}
