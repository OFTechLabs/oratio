///<reference path="../../../node_modules/@types/mathjs/index.d.ts"/>
import {INeuronResponse, SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {Silence} from "../../emergent/neurons/responses/Silence";
import * as knownWords from "./MathJSNeuron.words.json";
import {LocalizedWordsJson} from "../../language/i18n/LocalizedWordsJson";
import {LanguageUtil} from "../../language/LanguageUtil";
import {IHiveMindNeuron} from "../../emergent/HiveMindNeurons";
import {RequestContext} from "../../emergent/RequestContext";
import math = require("mathjs");

export class MathJSNeuron implements IHiveMindNeuron {

    public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
        let localizedKnownWords: string[] = ((knownWords as any) as LocalizedWordsJson).main[locale].words;
        if (context.hasPreviousInput() && context.previousInput.neuronHandled instanceof MathJSNeuron) {
            const continuations: string[] = ((knownWords as any) as LocalizedWordsJson).continuation[locale].words;
            localizedKnownWords = localizedKnownWords.concat(continuations);
        }

        if (this.startsWith(words[0], localizedKnownWords)) {
            const remainder: string = words.slice(1, words.length).reduce((a, b) => a + b);
            const evaluated = math.eval(remainder);

            return Promise.resolve(new SimpleResponse(
                "oratio.mathjs.evaluated",
                [evaluated + ""],
                1,
            ));
        }

        return Promise.resolve(new Silence());
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
