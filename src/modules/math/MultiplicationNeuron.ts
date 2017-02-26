import {BaseMathNeuron} from "./BaseMathNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import * as knownWords from "./MultiplicationNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";

export class MultiplicationNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): NeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "otario.math.multiplication",
            (a, b) => a * b,
        )).process(words, locale, context);
    }
}
