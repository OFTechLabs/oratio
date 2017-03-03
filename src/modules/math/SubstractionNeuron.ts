import {BaseMathNeuron} from "./BaseMathNeuron";
import * as knownWords from "./SubstractionNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";

export class SubstractionNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: any): INeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "otario.math.subtraction",
            (a, b) => a - b,
        )).process(words, locale, context);
    }
}
