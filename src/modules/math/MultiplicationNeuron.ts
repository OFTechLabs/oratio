import {BaseMathNeuron} from "./BaseMathNeuron";
import * as knownWords from "./MultiplicationNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {HiveMindContext} from "../../emergent/HiveMindContext";

export class MultiplicationNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: HiveMindContext): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "oratio.math.multiplication",
            (a, b) => a * b,
        )).process(words, locale, context);
    }
}
