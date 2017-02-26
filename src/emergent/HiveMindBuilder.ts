import {BasicHiveMindNeurons, IHiveMindNeuron} from "./HiveMindNeurons";
import {CoreNeurons} from "../modules/core/coreNeurons";
import {IHiveMind, BasicHiveMind} from "./HiveMind";
import {MathNeurons} from "../modules/math/mathNeurons";
import {MathJSNeurons} from "../modules/mathjs/mathJSNeurons";

export class HiveMindBuilder {

    private neurons: IHiveMindNeuron[];

    private constructor() {
        this.neurons = [];
    }

    public static createEmpty(): HiveMindBuilder {
        return new HiveMindBuilder();
    }

    public registerCoreModules(): HiveMindBuilder {
        this.neurons = this.neurons.concat(CoreNeurons.getCoreNeurons());
        return this;
    }

    public registerMathModules(): HiveMindBuilder {
        this.neurons = this.neurons.concat(MathNeurons.getMathNeurons());
        return this;
    }

    public registerMathJsModules(): HiveMindBuilder {
        this.neurons = this.neurons.concat(MathJSNeurons.getMathJSNeurons());
        return this;
    }

    public register(neurons: IHiveMindNeuron[]) {
        this.neurons = this.neurons.concat(neurons);
    }

    public build(): IHiveMind {
        return new BasicHiveMind(
            new BasicHiveMindNeurons(this.neurons)
        );
    }
}
