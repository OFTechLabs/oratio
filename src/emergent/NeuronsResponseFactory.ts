import { NeuronsResponse, SingleNeuronsResponse } from './NeuronsResponse';
import { INeuronResponse } from './neurons/responses/SimpleResponse';
import { IHiveMindNeuron } from './HiveMindNeurons';

export class NeuronsResponseFactory {

    public static create(neuron: IHiveMindNeuron, response: INeuronResponse): NeuronsResponse {
        const singleResponse = new SingleNeuronsResponse(neuron, response);

        return new NeuronsResponse(
            [singleResponse],
            singleResponse
        );
    }
}
