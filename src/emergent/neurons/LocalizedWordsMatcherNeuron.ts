import {INeuronResponse} from './responses/SimpleResponse';
import {LocalizedWords} from '../../language/i18n/LocalizedWords';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {SequenceParser} from '../../language/sequences/SequenceParser';
import {MultipleSequenceNeuron} from './MultipleSequenceNeuron';
import {UserInput} from "../BasicUserInput";
import {IHiveMindNeuron} from "../HiveMindNeurons";
import {RequestContext} from "../BasicRequestContext";

export class LocalizedWordsMatcherNeuron implements IHiveMindNeuron {

    constructor(private knownWords: LocalizedWords,
                private response: string) {
    }

    public process(userInput: UserInput,
                   requestContext: RequestContext,): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(
            this.knownWords,
            requestContext.locale(),
        );
        const sequences = SequenceParser.parse(localizedKnownWords);

        return new MultipleSequenceNeuron(
            sequences,
            this.response,
        ).process(userInput, requestContext);
    }
}
