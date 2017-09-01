import { ISingleNeuronsResponse, NeuronsResponse, SingleNeuronsResponse } from './NeuronsResponse';
import { IHiveMindNeuron } from './HiveMindNeurons';
import { INeuronResponse } from '../../emergentModule';
import { SilenceNeuron } from '../../SilenceNeuron';
import { Silence } from '../../neurons/responses/Silence';
import { LanguageUtil } from '../../../language/LanguageUtil';

export class NeuronsResponseFactory {

    public static create(neuron: IHiveMindNeuron, response: INeuronResponse): NeuronsResponse {
        const singleResponse = new SingleNeuronsResponse(neuron, response);

        return new NeuronsResponse(
            [singleResponse],
            singleResponse,
        );
    }

    public static createMultiple(neurons: ISingleNeuronsResponse[]): NeuronsResponse {
        if (LanguageUtil.isDefined(neurons) && neurons.length > 0) {

            neurons.sort((neuronA, neuronB) => neuronB.getResponse().getCertainty() - neuronA.getResponse().getCertainty());

            return new NeuronsResponse(
                neurons,
                neurons[0],
            );
        }

        return new NeuronsResponse(
            [],
            new SingleNeuronsResponse(SilenceNeuron.INSTANCE, new Silence())
        );
    }
}
