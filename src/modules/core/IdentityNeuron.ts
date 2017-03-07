import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import * as knownWords from "./IdentityNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {SequenceParser} from "../../language/sequences/SequenceParser";
import {Sequence} from "../../language/sequences/Sequence";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";

export class IdentityNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: any): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;
        const sequences = SequenceParser.parse(localizedKnownWords);

        return (new MultipleSequenceNeuron(
            sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.fourWords.map((sequence: Sequence) => sequence.withoutSpaces),
            "oratio.core.identity"))
            .process(words, locale, context);
    }

}
