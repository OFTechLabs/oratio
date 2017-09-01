import { NeuronsResponse, SingleNeuronsResponse } from './NeuronsResponse';
import { IHiveMindNeuron } from './HiveMindNeurons';
import { INeuronResponse } from '../../emergentModule';

export class NeuronsResponseFactory {

    public static create(neuron: IHiveMindNeuron, response: INeuronResponse): NeuronsResponse {
        const singleResponse = new SingleNeuronsResponse(neuron, response);

        return new NeuronsResponse(
            [singleResponse],
            singleResponse,
        );
    }
}
