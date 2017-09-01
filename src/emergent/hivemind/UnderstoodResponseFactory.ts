import { UnderstoodResponse, UnderstoodResponses } from './HiveResponse';
import { EMPTY_ACTION, EMPTY_CONTEXT } from './HiveMind';
import { INeuronResponse, SimpleResponse } from '../neurons/responses/SimpleResponse';
import { TranslationService } from '../../language/i18n/TranslationService';
import { ActionWithContextResponse } from '../neurons/responses/ActionWithContextResponse';
import { ActionResponse } from '../neurons/responses/ActionResponse';

export class UnderstoodResponseFactory {

    public static createMultiple(neuronsResponses: INeuronResponse[], translations: { [key: string]: string }): UnderstoodResponses {
        const responses = neuronsResponses.map(response => UnderstoodResponseFactory.create(response, translations));

        return new UnderstoodResponses(
            responses
        );
    }

    public static createSingle(neuronResponse: INeuronResponse, translations: { [key: string]: string }): UnderstoodResponses {
        return new UnderstoodResponses([UnderstoodResponseFactory.create(neuronResponse, translations)]);
    }

    private static create(neuronResponse: INeuronResponse, translations: { [key: string]: string }): UnderstoodResponse {
        if (neuronResponse.hasAnswer() && neuronResponse instanceof SimpleResponse) {

            const translatedResponse = TranslationService.translate(translations, neuronResponse.response, neuronResponse.params);
            if (neuronResponse instanceof ActionWithContextResponse) {
                return new UnderstoodResponse(
                    translatedResponse,
                    neuronResponse.params,
                    neuronResponse.getCertainty(),
                    neuronResponse.action,
                    neuronResponse.context,
                );
            } else if (neuronResponse instanceof ActionResponse) {
                return new UnderstoodResponse(
                    translatedResponse,
                    neuronResponse.params,
                    neuronResponse.getCertainty(),
                    neuronResponse.action,
                    EMPTY_CONTEXT,
                );
            } else if (neuronResponse instanceof SimpleResponse) {
                return new UnderstoodResponse(
                    translatedResponse,
                    neuronResponse.params,
                    neuronResponse.getCertainty(),
                    EMPTY_ACTION,
                    EMPTY_CONTEXT,
                );
            }
        }

        return new UnderstoodResponse(
            TranslationService.translate(translations, 'oratio.did.not.understand'),
            [],
            0.0,
            EMPTY_ACTION,
            EMPTY_CONTEXT,
        );
    }
}
