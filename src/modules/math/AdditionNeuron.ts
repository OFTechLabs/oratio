import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {BaseMathNeuron} from "./BaseMathNeuron";
import * as knownWords from "./AdditionNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";

export class AdditionNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): NeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "otario.math.addition",
            (a, b) => a + b,
        )).process(words, locale, context);
    }
}
