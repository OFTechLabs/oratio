import {BaseMathNeuron} from './BaseMathNeuron';
import {IHiveMindNeuron} from '../../emergent/HiveMindNeurons';
import {INeuronResponse} from '../../emergent/neurons/responses/SimpleResponse';
import {knownWords} from './DivisionNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {RequestContext} from "../../emergent/BasicRequestContext";
import {UserInput} from "../../emergent/BasicUserInput";

export class DivisionNeuron implements IHiveMindNeuron {
    public process(input: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            knownWords,
            context.locale(),
        );

        return new BaseMathNeuron(
            localizedKnownWords,
            'oratio.math.division',
            (a, b) => a / b,
        ).process(input, context);
    }
}
