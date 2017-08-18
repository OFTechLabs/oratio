import { MultipleSequenceNeuron } from '../../emergent/neurons/MultipleSequenceNeuron';
import { INeuronResponse, SimpleResponse, } from '../../emergent/neurons/responses/SimpleResponse';
import { SequenceParser } from '../../language/sequences/SequenceParser';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { RequestContext } from '../../emergent/RequestContext';
import { knownWords } from './TimeNeuron.words';
import { LocalizedWordsForLocaleFactory } from '../../language/i18n/LocalizedWordsForLocaleFactory';

export class TimeNeuron implements IHiveMindNeuron {
    public process(input: string[],
                   locale: string,
                   context: RequestContext,): Promise<INeuronResponse> {
        let localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            locale,
        ).words;
        if (
            context.hasPreviousInput() &&
            context.previousNeuronHandled instanceof TimeNeuron
        ) {
            const continuations: string[] = LocalizedWordsForLocaleFactory.createContinuation(
                knownWords,
                locale,
            ).words;
            localizedKnownWords = localizedKnownWords.concat(continuations);
        }

        const sequences = SequenceParser.parse(localizedKnownWords);
        const initialResponse: Promise<INeuronResponse> = new MultipleSequenceNeuron(
            sequences,
            'oratio.core.currentTime',)
            .process(input, locale, context);

        return initialResponse.then((response: INeuronResponse) => {
            if (response instanceof SimpleResponse) {
                const date = new Date();
                const time = date.getHours() + ':' + date.getMinutes();

                return response.withParams([time]);
            }

            return response;
        });
    }
}
