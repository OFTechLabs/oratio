import {INeuronResponse, SimpleResponse,} from '../../emergent/neurons/responses/SimpleResponse';
import {WordAfterSequenceParser} from '../../language/parsers/parameters/WordAfterSequenceParser';
import {SequenceParser} from '../../language/sequences/SequenceParser';
import {Sequence} from '../../language/sequences/Sequence';
import {knownWords} from './GreetingNeuron.words';
import {LocalizedWordsForLocaleFactory} from '../../language/i18n/LocalizedWordsForLocaleFactory';
import {LocalizedWordsMatcherNeuron} from '../../emergent/neurons/LocalizedWordsMatcherNeuron';
import {UserInput} from "../../emergent/BasicUserInput";
import {RequestContext} from "../../emergent/BasicRequestContext";
import { IHiveMindNeuron } from '../../emergent/hivemind/neurons/HiveMindNeurons';

export class GreetingNeuron implements IHiveMindNeuron {
    public process(userInput: UserInput,
                   context: RequestContext,): Promise<INeuronResponse> {
        const initialResponsePromise: Promise<INeuronResponse> = new LocalizedWordsMatcherNeuron(
            knownWords,
            'oratio.core.hello',
        ).process(userInput, context);

        return initialResponsePromise.then(
            (initialResponse: INeuronResponse) => {
                if (initialResponse instanceof SimpleResponse) {
                    const localizedKnownParams: string[] = LocalizedWordsForLocaleFactory.createParams(
                        knownWords,
                        context.locale(),
                    );
                    const paramSequences = SequenceParser.parse(
                        localizedKnownParams,
                    );
                    const newCertainty =
                        (initialResponse.getCertainty() * userInput.numberOfWords() + 1) /
                        userInput.numberOfWords();

                    const parser = new WordAfterSequenceParser(
                        paramSequences.sequences.map((sequence: Sequence) =>
                            sequence.sequence.split(' '),
                        ),
                    );

                    return Promise.resolve(
                        initialResponse
                            .withParams(parser.parse(userInput.words()))
                            .withCertainty(newCertainty),
                    );
                }

                return Promise.resolve(initialResponse);
            },
        );
    }
}
