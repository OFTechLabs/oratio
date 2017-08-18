import { ILocalizedHiveMindModule } from '../HiveMindModule';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { GreetingNeuron } from './GreetingNeuron';
import { IdentityNeuron } from './IdentityNeuron';
import { TimeNeuron } from './TimeNeuron';
import { CoreHiveMindTranslations } from './CoreHiveMindTranslations';

export class CoreHiveMindModule implements ILocalizedHiveMindModule {
    public static CORE_HIVE_MIND_MODULE: CoreHiveMindModule = new CoreHiveMindModule([
        new GreetingNeuron(),
        new IdentityNeuron(),
        new TimeNeuron(),
    ], {});

    private constructor(private _neurons: IHiveMindNeuron[],
                        private _translations: { [key: string]: string },) {
    }

    get neurons(): IHiveMindNeuron[] {
        return this._neurons;
    }

    get translations(): { [key: string]: string } {
        return this._translations;
    }

    public withTranslations(translations: CoreHiveMindTranslations): CoreHiveMindModule {
        return new CoreHiveMindModule(
            this.neurons,
            translations,
        );
    }
}
