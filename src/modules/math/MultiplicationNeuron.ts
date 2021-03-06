import {BaseMathNeuron} from './BaseMathNeuron';
import {INeuronResponse} from '../../emergent/neurons/responses/SimpleResponse';
import {knownWords} from './MultiplicationNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {UserInput} from "../../emergent/BasicUserInput";
import {RequestContext} from "../../emergent/BasicRequestContext";
import { IHiveMindNeuron } from '../../emergent/hivemind/neurons/HiveMindNeurons';

export class MultiplicationNeuron implements IHiveMindNeuron {
    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            context.locale(),
        );

        return new BaseMathNeuron(
            localizedKnownWords,
            'oratio.math.multiplication',
            (a, b) => a * b,
        ).process(input, context);
    }
}
