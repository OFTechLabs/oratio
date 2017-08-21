import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {INeuronResponse} from '../../emergent/neurons/responses/SimpleResponse';
import {RequestContext} from '../../emergent/RequestContext';
import {knownWords} from './IdentityNeuron.words';
import {LocalizedWordsMatcherNeuron} from '../../emergent/neurons/LocalizedWordsMatcherNeuron';

export class IdentityNeuron implements IHiveMindNeuron {
    public process(words: string[],
                   locale: string,
                   context: RequestContext,): Promise<INeuronResponse> {
        return new LocalizedWordsMatcherNeuron(
            knownWords,
            'oratio.core.identity',
        ).process(words, locale, context);
    }
}
