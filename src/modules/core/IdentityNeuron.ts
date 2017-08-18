import { MultipleSequenceNeuron } from '../../emergent/neurons/MultipleSequenceNeuron';
import { SequenceParser } from '../../language/sequences/SequenceParser';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { INeuronResponse } from '../../emergent/neurons/responses/SimpleResponse';
import { RequestContext } from '../../emergent/RequestContext';
import { knownWords } from './IdentityNeuron.words';
import { LocalizedWordsForLocaleFactory } from '../../language/i18n/LocalizedWordsForLocaleFactory';

export class IdentityNeuron implements IHiveMindNeuron {
    public process(words: string[],
                   locale: string,
                   context: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            locale,
        ).words;
        const sequences = SequenceParser.parse(localizedKnownWords);

        return new MultipleSequenceNeuron(
            sequences,
            'oratio.core.identity',
        ).process(words, locale, context);
    }
}
