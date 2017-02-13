import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {WordAfterSequenceParser} from "../../language/parsers/parameters/WordAfterSequenceParser";

export class GreetingNeuron implements IHiveMindNeuron {

    private static KNOWN_WORDS: string [] = ["hello", "hi"];
    private static KNOWN_TWO_WORD_SEQUENCES: string [] = ["iam"];
    private static KNOWN_THREE_WORD_SEQUENCES: string[] = ["mynameis"];

    public process(words: string[], context: string): NeuronResponse {
        const initialResponse: NeuronResponse = (new MultipleSequenceNeuron(
            GreetingNeuron.KNOWN_WORDS,
            GreetingNeuron.KNOWN_TWO_WORD_SEQUENCES,
            GreetingNeuron.KNOWN_THREE_WORD_SEQUENCES,
            [],
            "oratio.hello"))
            .process(words, context);

        if (initialResponse instanceof SimpleResponse) {
            const parser = new WordAfterSequenceParser(
                [
                    ["my", "name", "is"],
                    ["I", "am"],
                ],
            );

            return initialResponse.withParams(parser.parse(words));
        }

        return initialResponse;
    }

}
