import {ILocalizedHiveMindModule} from '../HiveMindModule';
import {CoreHiveMindTranslations} from './CoreHiveMindTranslations';
import { IdentityNeuron } from './IdentityNeuron';
import { TimeNeuron } from './TimeNeuron';
import { GreetingNeuron } from './GreetingNeuron';
import { IHiveMindNeuron } from '../../emergent/hivemind/neurons/HiveMindNeurons';

export const getCoreNeurons: () => IHiveMindNeuron[] = () => {
    return [new GreetingNeuron(), new IdentityNeuron(), new TimeNeuron()];
}

export class CoreHiveMindModule implements ILocalizedHiveMindModule {
    public static CORE_HIVE_MIND_MODULE: CoreHiveMindModule = new CoreHiveMindModule(
        getCoreNeurons(),
        {}
    );

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
