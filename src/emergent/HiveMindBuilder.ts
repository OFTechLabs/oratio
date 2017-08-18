import { BasicHiveMindNeurons, IHiveMindNeuron } from './HiveMindNeurons';
import { CoreNeurons } from '../modules/core/coreNeurons';
import { BasicHiveMind, IHiveMind } from './HiveMind';
import { MathNeurons } from '../modules/math/mathNeurons';
import { IHiveMindModule } from '../modules/HiveMindModule';

export class HiveMindBuilder {
    private neurons: IHiveMindNeuron[];
    private certaintyThreshold: number;

    private constructor() {
        this.neurons = [];
        this.certaintyThreshold = 0.8;
    }

    public static createEmpty(): HiveMindBuilder {
        return new HiveMindBuilder();
    }

    public registerModule(module: IHiveMindModule): HiveMindBuilder {
        this.neurons = this.neurons.concat(module.neurons);
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
        );
    }
}
