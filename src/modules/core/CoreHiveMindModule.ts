import { IHiveMindModule } from '../HiveMindModule';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { GreetingNeuron } from './GreetingNeuron';
import { IdentityNeuron } from './IdentityNeuron';
import { TimeNeuron } from './TimeNeuron';

export class CoreHiveMindModule implements IHiveMindModule {

    public static CORE_HIVE_MIND_MODULE: CoreHiveMindModule = new CoreHiveMindModule([
        new GreetingNeuron(),
        new IdentityNeuron(),
        new TimeNeuron(),
    ]);

    private constructor(private _neurons: IHiveMindNeuron[]) {
    }

    get neurons(): IHiveMindNeuron[] {
        return this._neurons;
    }
}
