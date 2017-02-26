import {BaseMathNeuron} from "./BaseMathNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import * as knownWords from "./SubstractionNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";

export class SubstractionNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): NeuronResponse {
        const localizedKnownWords: string[] = (<LocalizedWordsJson> (<any> knownWords)).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "otario.math.subtraction",
            (a, b) => a - b
        )).process(words, locale, context);
    }
}