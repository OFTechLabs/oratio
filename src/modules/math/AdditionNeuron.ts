import { BaseMathNeuron } from './BaseMathNeuron';
import { IHiveMindNeuron } from '../../emergent/HiveMindNeurons';
import { INeuronResponse } from '../../emergent/neurons/responses/SimpleResponse';
import { RequestContext } from '../../emergent/RequestContext';
import { knownWords } from './AdditionNeuron.words';

export class AdditionNeuron implements IHiveMindNeuron {
    public process(
        words: string[],
        locale: string,
        context: RequestContext,
    ): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = knownWords.main[locale].words;

        return new BaseMathNeuron(
            localizedKnownWords,
            'oratio.math.addition',
            (a, b) => a + b,
        ).process(words, locale, context);
    }
}
