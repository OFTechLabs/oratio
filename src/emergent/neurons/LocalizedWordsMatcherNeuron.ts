import {INeuronResponse} from './responses/SimpleResponse';
import {LocalizedWords} from '../../language/i18n/LocalizedWords';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {SequenceParser} from '../../language/sequences/SequenceParser';
import {MultipleSequenceNeuron} from './MultipleSequenceNeuron';

export class LocalizedWordsMatcherNeuron {

    constructor(private knownWords: LocalizedWords,
                private response: string) {
    }

    public process(input: string[],
                   locale: string,
                   context: any,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            this.knownWords,
            locale,
        );
        const sequences = SequenceParser.parse(localizedKnownWords);

        return new MultipleSequenceNeuron(
            sequences,
            this.response,
        ).process(input, locale, context);
    }
}
