
import { IHiveMindNeuron } from '../emergent/hivemind/neurons/HiveMindNeurons';

export interface IHiveMindModule {

    readonly neurons: IHiveMindNeuron[];
}

export interface ILocalizedHiveMindModule extends IHiveMindModule {

    readonly translations: { [key: string]: string };
}
