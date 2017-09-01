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
    private waitForAllNeurons: boolean;
    private translations: { [key: string]: string };
    private pureEmergence: boolean;
    private neuronHints: INeuronHints;

    private constructor() {
        this.neurons = [];
        this.certaintyThreshold = 0.8;
        this.translations = {};
        this.pureEmergence = false;
        this.waitForAllNeurons = false;
        this.neuronHints = NeuronHintsBuilder.create().build();
    }

    public static createEmpty(): HiveMindBuilder {
        return new HiveMindBuilder();
    }

    /**
     * Registers a module, all neurons inside will be used by Oratio
     * @param {IHiveMindModule} module the module to register
     * @returns {HiveMindBuilder}
     */
    public registerModule(module: IHiveMindModule): HiveMindBuilder {
        this.neurons = this.neurons.concat(module.neurons);
        if (LanguageUtil.isDefined((module as ILocalizedHiveMindModule).translations)) {
            Object.assign(this.translations, (module as ILocalizedHiveMindModule).translations);
        }
        return this;
    }

    /**
     * Register neurons, they will all receive input and might return a response.
     * @param {IHiveMindNeuron[]} neurons the neurons to register
     * @returns {HiveMindBuilder}
     */
    public registerNeurons(neurons: IHiveMindNeuron[]): HiveMindBuilder {
        this.neurons = this.neurons.concat(neurons);
        return this;
    }

    /**
     * If a neuron has a higher certainty than the threshold we immediately return that neurons response, instead of waiting
     * for all the other neurons
     * @param {number} threshold the threshold should be between 0 and 1, indicating a certainty perunage
     * @returns {HiveMindBuilder}
     */
    public withCertaintyThreshold(threshold: number): HiveMindBuilder {
        this.certaintyThreshold = threshold;
        return this;
    }

    /**
     * This makes sure we ignore the certainty threshold, so we never return a neurons response before all neurons
     * regardless of how certain any neuron is.
     * @returns {HiveMindBuilder}
     */
    public alwaysWaitForAllNeurons(): HiveMindBuilder {
        this.waitForAllNeurons = true;
        return this;
    }

    /**
     * Pure emergence means we allow mutliple neurons to give a response, instead of just the most certain one.
     * @param {boolean} pureEmergence whether to use pure emergence
     * @returns {HiveMindBuilder}
     */
    public withPureEmergence(pureEmergence: boolean): HiveMindBuilder {
        this.pureEmergence = true;
        return this;
    }

    /**
     * The hints to pass on to all neurons, keep in mind there is no guarantee all neurons adhere to the hints,
     * do they should.
     * @param {INeuronHints} neuronHints will be send to all neurons
     * @returns {HiveMindBuilder}
     */
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
            const threshold = this.waitForAllNeurons ? Number.POSITIVE_INFINITY : this.certaintyThreshold;
            return new BasicHiveMind(
                new BasicHiveMindNeurons(this.neurons, threshold),
                this.neuronHints,
                this.translations,
            );
        }
    }
}
