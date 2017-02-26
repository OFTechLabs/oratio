import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import {SimpleResponse, INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {SequenceParser} from "../../language/sequences/SequenceParser";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import * as knownWords from "./TimeNeuron.words.json";
import {Sequence} from "../../language/sequences/Sequence";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";

export class TimeNeuron implements IHiveMindNeuron {

    public process(input: string[], locale: string, context: string): INeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;
        const sequences = SequenceParser.parse(localizedKnownWords);

        const initialResponse = (new MultipleSequenceNeuron(
            sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
            sequences.fourWords.map((sequence: Sequence) => sequence.withoutSpaces),
            "oratio.core.currentTime"))
            .process(input, locale, context);

        if (initialResponse instanceof SimpleResponse) {
            const date = new Date();
            const time = date.getHours() + ":" + date.getMinutes();

            return initialResponse.withParams([time]);
        }

        return initialResponse;
    }

}
