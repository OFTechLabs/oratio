import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import * as knownWords from "./IdentityNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {SequenceParser} from "../../language/sequences/SequenceParser";

export class IdentityNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): NeuronResponse {
        const localizedKnownWords: string[] = (<LocalizedWordsJson> (<any> knownWords)).main[locale].words;
        const sequences = SequenceParser.parse(localizedKnownWords);

        return (new MultipleSequenceNeuron(
            sequences.singleWord.map(sequence => sequence.withoutSpaces),
            sequences.twoWords.map(sequence => sequence.withoutSpaces),
            sequences.threeWords.map(sequence => sequence.withoutSpaces),
            sequences.fourWords.map(sequence => sequence.withoutSpaces),
            "oratio.core.identity"))
            .process(words, locale, context);
    }

}
