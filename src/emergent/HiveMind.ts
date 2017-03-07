import {IHiveResponse, UnderstoodResponse} from "./HiveResponse";
import {IHiveMindNeurons} from "./HiveMindNeurons";
import {SimpleResponse, INeuronResponse} from "./neurons/responses/SimpleResponse";
import {ActionResponse} from "./neurons/responses/ActionResponse";
import {ActionWithContextResponse} from "./neurons/responses/ActionWithContextResponse";
import {FailedResponse} from "./FailedResponse";

export interface IHiveMind {

    process(input: string, locale: string, context: any): Promise<IHiveResponse>;

}

export class BasicHiveMind implements IHiveMind {

    private static EMPTY_CONTEXT = {};
    private static EMPTY_ACTION = () => {
        return;
    }

    private neurons: IHiveMindNeurons;

    constructor(neurons: IHiveMindNeurons) {
        this.neurons = neurons;
    }

    public process(input: string, locale: string, context: any): Promise<IHiveResponse> {

        const words = input.split(" ");

        const neuronsResponsePromise = this.neurons.findMatch(words, locale, context);

        return neuronsResponsePromise.then((neuronsResponse: INeuronResponse)  => {
            if (neuronsResponse.hasAnswer()) {
                if (neuronsResponse instanceof ActionWithContextResponse) {

                    return new UnderstoodResponse(
                        neuronsResponse.response,
                        neuronsResponse.params,
                        neuronsResponse.getCertainty(),
                        neuronsResponse.action,
                        neuronsResponse.context);
                } else if (neuronsResponse instanceof ActionResponse) {

                    return new UnderstoodResponse(
                        neuronsResponse.response,
                        neuronsResponse.params,
                        neuronsResponse.getCertainty(),
                        neuronsResponse.action,
                        BasicHiveMind.EMPTY_CONTEXT);
                } else if (neuronsResponse instanceof SimpleResponse) {

                    return new UnderstoodResponse(
                        neuronsResponse.response,
                        neuronsResponse.params,
                        neuronsResponse.getCertainty(),
                        BasicHiveMind.EMPTY_ACTION,
                        BasicHiveMind.EMPTY_CONTEXT);
                }
            }
            return new FailedResponse("oratio.did.not.understand");
        });
    }
}
