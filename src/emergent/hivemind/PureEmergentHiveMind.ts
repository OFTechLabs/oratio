import { IHiveMind } from './HiveMind';
import { IHiveResponse } from './HiveResponse';
import { HiveMindInputNode } from './HiveMindInputNode';
import { UnderstoodResponseFactory } from './UnderstoodResponseFactory';
import { BasicLocale, Locale } from '../../language/i18n/BasicLocale';
import { BasicUserInput } from '../BasicUserInput';
import { LanguageUtil } from '../../language/LanguageUtil';
import { BasicRequestContext } from '../BasicRequestContext';
import { INeuronsResponse } from './neurons/NeuronsResponse';
import { SilenceNeuron } from '../SilenceNeuron';
import { FailedResponses } from '../FailedResponse';
import { PureEmergentHiveMindNeurons } from './neurons/PureEmergentHiveMindNeurons';
import { INeuronHints } from '../NeuronHints';

export class PureEmergentHiveMind implements IHiveMind {

    private previousInput: HiveMindInputNode | null;

    constructor(private neurons: PureEmergentHiveMindNeurons,
                private neuronHints: INeuronHints,
                private translations: { [key: string]: string }) {
        this.previousInput = null;
    }

    public process(input: string,
                   locale: Locale,
                   clientModel: any,): Promise<IHiveResponse> {

        const basicInput = new BasicUserInput(input);
        const nullSafeLocale = LanguageUtil.isDefined(locale) ? locale : new BasicLocale('', '');
        const context = new BasicRequestContext(this.previousInput, clientModel, nullSafeLocale, this.neuronHints);
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

                    this.previousInput = new HiveMindInputNode(
                        this.previousInput,
                        neuronsResponse.getResponses().map(response => response.getFiredNeuron()),
                        neuronsResponse.getMostCertainResponse().getFiredNeuron(),
                        basicInput,
                    );

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
