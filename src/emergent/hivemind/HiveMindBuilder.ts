import { BasicHiveMind, IHiveMind } from './HiveMind';
import { BasicHiveMindNeurons, IHiveMindNeuron } from './neurons/HiveMindNeurons';
import { IHiveMindModule, ILocalizedHiveMindModule } from '../../modules/HiveMindModule';
import { LanguageUtil } from '../../language/LanguageUtil';
import { PureEmergentHiveMind } from './PureEmergentHiveMind';
import { PureEmergentHiveMindNeurons } from './neurons/PureEmergentHiveMindNeurons';
import { INeuronHints } from '../NeuronHints';
import { NeuronHintsBuilder } from '../NeuronHintsBuilder';

export class HiveMindBuilder {

    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;
    private translations: { [key: string]: string };
    private pureEmergence: boolean;
    private neuronHints: INeuronHints;

    private constructor() {
        this.neurons = [];
        this.certaintyThreshold = 0.8;
        this.translations = {};
        this.pureEmergence = false;
        this.neuronHints = NeuronHintsBuilder.create().build();
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

    public withPureEmergence(pureEmergence: boolean): HiveMindBuilder {
        this.pureEmergence = true;
        return this;
    }

    public withNeuronHints(neuronHints: INeuronHints): HiveMindBuilder {
        this.neuronHints = neuronHints;
        return this;
    }

    public build(): IHiveMind {
        if (this.pureEmergence) {
            return new PureEmergentHiveMind(
                new PureEmergentHiveMindNeurons(this.neurons),
                this.neuronHints,
                this.translations,
            );
        } else {
            return new BasicHiveMind(
                new BasicHiveMindNeurons(this.neurons, this.certaintyThreshold),
                this.neuronHints,
                this.translations,
            );
        }
    }
}
