import { MathJSNeuron } from './MathJSNeuron';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';

export * from './MathJSNeuron';

export class MathJSNeurons {
    public static getMathJSNeurons(): IHiveMindNeuron[] {
        return [new MathJSNeuron()];
    }
}
