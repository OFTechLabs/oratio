import {BaseMathNeuron} from './BaseMathNeuron';
import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {INeuronResponse} from '../../emergent/neurons/responses/SimpleResponse';
import {RequestContext} from '../../emergent/RequestContext';
import {knownWords} from './AdditionNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';

export class AdditionNeuron implements IHiveMindNeuron {
    public process(words: string[],
                   locale: string,
                   context: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            locale,
        ).words;

        return new BaseMathNeuron(
            localizedKnownWords,
            'oratio.math.addition',
            (a, b) => a + b,
        ).process(words, locale, context);
    }
}
