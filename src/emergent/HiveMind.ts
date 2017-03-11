import {IHiveResponse, UnderstoodResponse} from "./HiveResponse";
import {IHiveMindNeurons} from "./HiveMindNeurons";
import {SimpleResponse} from "./neurons/responses/SimpleResponse";
import {ActionResponse} from "./neurons/responses/ActionResponse";
import {ActionWithContextResponse} from "./neurons/responses/ActionWithContextResponse";
import {FailedResponse} from "./FailedResponse";
import {HiveMindContext} from "./HiveMindContext";
import {HiveMindInputNode} from "./HiveMindInputNode";
import {INeuronsResponse} from "./NeuronsResponse";

export interface IHiveMind {

    process(input: string, locale: string, context: HiveMindContext): Promise<IHiveResponse>;

}

export class BasicHiveMind implements IHiveMind {

    private static EMPTY_CONTEXT = {};
    private static EMPTY_ACTION = () => {
        return;
    }

    private neurons: IHiveMindNeurons;
    private previousInput: HiveMindInputNode;

    constructor(neurons: IHiveMindNeurons) {
        this.neurons = neurons;
        this.previousInput = null;
    }

    public process(input: string, locale: string, clientModel: any): Promise<IHiveResponse> {
        const words = input.split(" ");

        const context = new HiveMindContext(this.previousInput, clientModel);
        const neuronsResponsePromise = this.neurons.findMatch(words, locale, context);

        return neuronsResponsePromise.then((neuronsResponse: INeuronsResponse)  => {
            const response = neuronsResponse.getResponse();

            if (response.hasAnswer()) {
                this.previousInput = new HiveMindInputNode(this.previousInput, neuronsResponse.getFiredNeuron(), words);

                if (response instanceof ActionWithContextResponse) {

                    return new UnderstoodResponse(
                        response.response,
                        response.params,
                        response.getCertainty(),
                        response.action,
                        response.context);
                } else if (response instanceof ActionResponse) {

                    return new UnderstoodResponse(
                        response.response,
                        response.params,
                        response.getCertainty(),
                        response.action,
                        BasicHiveMind.EMPTY_CONTEXT);
                } else if (response instanceof SimpleResponse) {

                    return new UnderstoodResponse(
                        response.response,
                        response.params,
                        response.getCertainty(),
                        BasicHiveMind.EMPTY_ACTION,
                        BasicHiveMind.EMPTY_CONTEXT);
                }
            }

            this.previousInput = new HiveMindInputNode(this.previousInput, null, words);
            return new FailedResponse("oratio.did.not.understand");
        });
    }
}
