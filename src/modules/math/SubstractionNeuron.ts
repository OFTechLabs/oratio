import {BaseMathNeuron} from './BaseMathNeuron';
import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {INeuronResponse} from '../../emergent/neurons/responses/SimpleResponse';
import {knownWords} from './SubstractionNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {UserInput} from "../../emergent/BasicUserInput";
import {RequestContext} from "../../emergent/BasicRequestContext";

export class SubstractionNeuron implements IHiveMindNeuron {
    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            context.locale(),
        );

        return new BaseMathNeuron(
            localizedKnownWords,
            'oratio.math.subtraction',
            (a, b) => a - b,
        ).process(input, context);
    }
}
