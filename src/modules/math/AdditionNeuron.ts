import {BaseMathNeuron} from "./BaseMathNeuron";
import * as knownWords from "./AdditionNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";

export class AdditionNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: any): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "oratio.math.addition",
            (a, b) => a + b,
        )).process(words, locale, context);
    }
}
