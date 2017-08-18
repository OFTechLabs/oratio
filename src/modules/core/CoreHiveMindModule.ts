import {ILocalizedHiveMindModule} from '../HiveMindModule';
import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {CoreHiveMindTranslations} from './CoreHiveMindTranslations';
import {CoreNeurons} from "./coreNeurons";

export class CoreHiveMindModule implements ILocalizedHiveMindModule {
    public static CORE_HIVE_MIND_MODULE: CoreHiveMindModule = new CoreHiveMindModule(
        CoreNeurons.getCoreNeurons(),
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
