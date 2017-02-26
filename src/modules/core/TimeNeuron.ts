import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {SequenceParser} from "../../language/sequences/SequenceParser";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import * as knownWords from "./TimeNeuron.words.json";
import {Sequence} from "../../language/sequences/Sequence";

export class TimeNeuron implements IHiveMindNeuron {

    public process(input: string[], locale: string, context: string): NeuronResponse {
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
