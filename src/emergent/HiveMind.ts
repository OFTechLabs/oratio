import {IHiveResponse, UnderstoodResponse, UnderstoodResponses} from './HiveResponse';
import {IHiveMindNeurons} from './HiveMindNeurons';
import {SimpleResponse} from './neurons/responses/SimpleResponse';
import {ActionResponse} from './neurons/responses/ActionResponse';
import {ActionWithContextResponse} from './neurons/responses/ActionWithContextResponse';
import {FailedResponses} from './FailedResponse';
import {HiveMindInputNode} from './HiveMindInputNode';
import {INeuronsResponse} from './NeuronsResponse';
import {SilenceNeuron} from './SilenceNeuron';
import {TranslationService} from "../language/i18n/TranslationService";
import {BasicLocale, Locale} from "../language/i18n/BasicLocale";
import {BasicUserInput} from "./BasicUserInput";
import {BasicRequestContext} from "./BasicRequestContext";
import {LanguageUtil} from "../language/LanguageUtil";

export interface IHiveMind {
    process(input: string,
            locale: Locale,
            clientModel: any,): Promise<IHiveResponse>;
}

export const EMPTY_CONTEXT = {};
export const EMPTY_ACTION = () => {
    return;
};

export class BasicHiveMind implements IHiveMind {

    private previousInput: HiveMindInputNode | null;

    constructor(private neurons: IHiveMindNeurons,
                private translations: { [key: string]: string }) {
        this.previousInput = null;
    }

    public process(input: string,
                   locale: Locale,
                   clientModel: any,): Promise<IHiveResponse> {

        const basicInput = new BasicUserInput(input)
        const nullSafeLocale = LanguageUtil.isDefined(locale) ? locale : new BasicLocale("", "");
        const context = new BasicRequestContext(this.previousInput, clientModel, nullSafeLocale,);
        const neuronsResponsePromise = this.neurons.findMatch(
            basicInput,
            context,
        );

        return neuronsResponsePromise.then(
            (neuronsResponse: INeuronsResponse) => {
                const response = neuronsResponse.getResponse();

                if (response.hasAnswer() && response instanceof SimpleResponse) {
                    this.previousInput = new HiveMindInputNode(
                        this.previousInput,
                        [neuronsResponse.getFiredNeuron()],
                        neuronsResponse.getFiredNeuron(),
                        basicInput,
                    );

                    const translatedResponse = TranslationService.translate(this.translations, response.response, response.params);
                    if (response instanceof ActionWithContextResponse) {
                        return new UnderstoodResponses([new UnderstoodResponse(
                            translatedResponse,
                            response.params,
                            response.getCertainty(),
                            response.action,
                            response.context,
                        )]);
                    } else if (response instanceof ActionResponse) {
                        return new UnderstoodResponses([new UnderstoodResponse(
                            translatedResponse,
                            response.params,
                            response.getCertainty(),
                            response.action,
                            EMPTY_CONTEXT,
                        )]);
                    } else if (response instanceof SimpleResponse) {
                        return new UnderstoodResponses([new UnderstoodResponse(
                            translatedResponse,
                            response.params,
                            response.getCertainty(),
                            EMPTY_ACTION,
                            EMPTY_CONTEXT,
                        )]);
                    }
                }

                this.previousInput = new HiveMindInputNode(
                    this.previousInput,
                    [],
                    SilenceNeuron.INSTANCE,
                    basicInput,
                );
                return new FailedResponses('oratio.did.not.understand');
            },
        );
    }
}
