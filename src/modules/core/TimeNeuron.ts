import {MultipleSequenceNeuron} from '../../emergent/neurons/MultipleSequenceNeuron';
import {INeuronResponse, SimpleResponse,} from '../../emergent/neurons/responses/SimpleResponse';
import {SequenceParser} from '../../language/sequences/SequenceParser';
import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {knownWords} from './TimeNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {RequestContext} from "../../emergent/BasicRequestContext";
import {UserInput} from "../../emergent/BasicUserInput";

export class TimeNeuron implements IHiveMindNeuron {
    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        let localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            context.locale(),
        );
        if (
            context.hasPreviousInput() &&
            context.mostCertainNeuronHandled() instanceof TimeNeuron
        ) {
            const continuations: string[] = LocalizedWordsForLocaleFactory.createContinuation(
                knownWords,
                context.locale(),
            );
            localizedKnownWords = localizedKnownWords.concat(continuations);
        }

        const sequences = SequenceParser.parse(localizedKnownWords);
        const initialResponse: Promise<INeuronResponse> = new MultipleSequenceNeuron(
            sequences,
            'oratio.core.currentTime',)
            .process(input, context);

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
