import {IHiveMindNeuron} from "../../neurons/HiveMindNeuron";
import {MultipleSequenceNeuron} from "../../neurons/MultipleSequenceNeuron";
import {NeuronResponse} from "../../neurons/responses/NeuronResponse";
import {WordAfterSequenceParser} from "../../../language/parsers/parameters/WordAfterSequenceParser";
import {SimpleResponse} from "../../neurons/responses/SimpleResponse";

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
