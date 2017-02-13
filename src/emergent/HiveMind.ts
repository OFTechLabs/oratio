import {HiveResponse, UnderstoodResponse, FailedResponse} from "./HiveResponse";
import {HiveMindNeuron} from "./neurons/HiveMindNeuron";
import {HiveMindNeurons} from "./HiveMindNeurons";
import {SimpleResponse} from "./neurons/responses/SimpleResponse";
import {ActionResponse} from "./neurons/responses/ActionResponse";
import {ActionWithContextResponse} from "./neurons/responses/ActionWithContextResponse";

export interface HiveMind {

    process(input: string, context: string): HiveResponse;

}

export class BasicHiveMind implements HiveMind {

    private neurons: HiveMindNeurons;

    constructor(neurons: HiveMindNeurons) {
        this.neurons = neurons;
    }

    process(input: string, context: string): HiveResponse {

        const words = input.split(" ");

        const neuronsResponse = this.neurons.findMatch(words, context);

        if (neuronsResponse.hasAnswer()) {
            if (neuronsResponse instanceof SimpleResponse) {
                return new UnderstoodResponse(neuronsResponse.response, neuronsResponse.params, BasicHiveMind.EMPTY_ACTION, BasicHiveMind.EMPTY_CONTEXT);
            } else if (neuronsResponse instanceof ActionResponse) {
                return new UnderstoodResponse(neuronsResponse.response,  neuronsResponse.params, neuronsResponse.action, BasicHiveMind.EMPTY_CONTEXT);
            } else if (neuronsResponse instanceof ActionWithContextResponse) {
                return new UnderstoodResponse(neuronsResponse.response,  neuronsResponse.params, neuronsResponse.action, neuronsResponse.context);
            }
        }

        return new FailedResponse("oratio.did.not.undestand");
    }

    private static EMPTY_ACTION  = () => {};
    private static EMPTY_CONTEXT  = () => {};

    public addNeurons(neurons: HiveMindNeuron[]) {
        this.neurons.registerNeurons(neurons);
    }
}
