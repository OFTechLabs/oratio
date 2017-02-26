///<reference path="../../../node_modules/@types/mathjs/index.d.ts"/>
import {SimpleResponse, INeuronResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {Silence} from "../../emergent/neurons/responses/Silence";
import math = require("mathjs");
import * as knownWords from "./MathJSNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {LanguageUtil} from "../../language/LanguageUtil";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";

export class MathJSNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: string): INeuronResponse {
        const localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;

        if (this.startsWith(words[0], localizedKnownWords)) {
            const remainder: string = words.slice(1, words.length).reduce((a, b) => a + b);
            const evaluated = math.eval(remainder);

            return new SimpleResponse(
                "otario.mathjs.evaluated",
                [evaluated + ""],
            );
        }

        return new Silence();
    }

    private startsWith(word: string, possibleStarts: string[]): boolean {
        if (LanguageUtil.isSequence(possibleStarts)) {
            return possibleStarts.filter((possibleStart: string) => {
                return possibleStart === word;
            }).length > 0;
        }

        return false;
    }
}
