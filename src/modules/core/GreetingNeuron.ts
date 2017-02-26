import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {WordAfterSequenceParser} from "../../language/parsers/parameters/WordAfterSequenceParser";
import {SequenceParser} from "../../language/sequences/SequenceParser";
import * as knownWords from "./GreetingNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {Sequence} from "../../language/sequences/Sequence";

export class GreetingNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): NeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;
        const sequences = SequenceParser.parse(localizedKnownWords);

        const initialResponse: NeuronResponse = (new MultipleSequenceNeuron(
            sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
            [],
            "oratio.core.hello"))
            .process(words, locale, context);

        if (initialResponse instanceof SimpleResponse) {
            const localizedKnownParams: string[] = ((knownWords as any) as LocalizedWordsJson).params[locale].words;
            const paramSequences = SequenceParser.parse(localizedKnownParams);

            const parser = new WordAfterSequenceParser(
                paramSequences.sequences.map((sequence: Sequence) => sequence.sequence.split(" ")),
            );

            return initialResponse.withParams(parser.parse(words));
        }

        return initialResponse;
    }

}
