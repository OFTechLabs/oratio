import {IHiveMindNeuron} from '../emergent/HiveMindNeurons';

export interface IHiveMindModule {

    readonly neurons: IHiveMindNeuron[];
}

export interface ILocalizedHiveMindModule extends IHiveMindModule {

    readonly translations: { [key: string]: string };
}
