import {BasicHiveMindNeurons, IHiveMindNeuron} from './HiveMindNeurons';
import {BasicHiveMind, IHiveMind} from './HiveMind';
import {IHiveMindModule, ILocalizedHiveMindModule} from '../modules/HiveMindModule';
import {LanguageUtil} from "../language/LanguageUtil";

export class HiveMindBuilder {
    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;
    private translations: { [key: string]: string }

    private constructor() {
        this.neurons = [];
        this.certaintyThreshold = 0.8;
        this.translations = {};
    }

    public static createEmpty(): HiveMindBuilder {
        return new HiveMindBuilder();
    }

    public registerModule(module: IHiveMindModule): HiveMindBuilder {
        this.neurons = this.neurons.concat(module.neurons);
        if (LanguageUtil.isDefined((module as ILocalizedHiveMindModule).translations)) {
            Object.assign(this.translations, (module as ILocalizedHiveMindModule).translations);
        }
        return this;
    }

    public registerNeurons(neurons: IHiveMindNeuron[]): HiveMindBuilder {
        this.neurons = this.neurons.concat(neurons);
        return this;
    }

    public withCertaintyThreshold(threshold: number): HiveMindBuilder {
        this.certaintyThreshold = threshold;
        return this;
    }

    public build(): IHiveMind {
        return new BasicHiveMind(
            new BasicHiveMindNeurons(this.neurons, this.certaintyThreshold),
            this.translations
        );
    }
}
