import {BaseMathNeuron} from "./BaseMathNeuron";
import * as knownWords from "./MultiplicationNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {RequestContext} from "../../emergent/RequestContext";

export class MultiplicationNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        return (new BaseMathNeuron(
            localizedKnownWords,
            "oratio.math.multiplication",
            (a, b) => a * b,
        )).process(words, locale, context);
    }
}
