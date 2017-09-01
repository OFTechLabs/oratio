import { IHiveMind } from './HiveMind';
import { BasicLocale, Locale } from '../language/i18n/BasicLocale';
import { IHiveResponse } from './HiveResponse';
import { HiveMindInputNode } from './HiveMindInputNode';
import { BasicUserInput } from './BasicUserInput';
import { LanguageUtil } from '../language/LanguageUtil';
import { BasicRequestContext } from './BasicRequestContext';
import { INeuronsResponse } from './NeuronsResponse';
import { SilenceNeuron } from './SilenceNeuron';
import { FailedResponses } from './FailedResponse';
import { IHiveMindNeurons } from './HiveMindNeurons';
import { UnderstoodResponseFactory } from './UnderstoodResponseFactory';

export class PureEmergentHiveMind implements IHiveMind {

    private previousInput: HiveMindInputNode | null;

    constructor(private neurons: IHiveMindNeurons,
                private translations: { [key: string]: string }) {
        this.previousInput = null;
    }

    public process(input: string,
                   locale: Locale,
                   clientModel: any,): Promise<IHiveResponse> {

        const basicInput = new BasicUserInput(input);
        const nullSafeLocale = LanguageUtil.isDefined(locale) ? locale : new BasicLocale('', '');
        const context = new BasicRequestContext(this.previousInput, clientModel, nullSafeLocale,);
        const neuronsResponsePromise = this.neurons.findMatch(
            basicInput,
            context,
        );

        return neuronsResponsePromise.then(
            (neuronsResponse: INeuronsResponse) => {
                const neuronResponses = neuronsResponse
                    .getResponses()
                    .filter(response => response.getResponse().hasAnswer());

                if (neuronResponses.length > 0) {
                    const responses = neuronResponses.map(response => response.getResponse());
                    return UnderstoodResponseFactory.createMultiple(responses, this.translations);
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
