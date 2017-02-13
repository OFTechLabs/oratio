///<reference path="../../../node_modules/@types/mathjs/index.d.ts"/>
import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {Silence} from "../../emergent/neurons/responses/Silence";
import math = require("mathjs");

export class MathJSNeuron implements IHiveMindNeuron {

    private static MATH_START: string = "math:";

    public process(words: string[], context: string): NeuronResponse {
        if (words[0] === MathJSNeuron.MATH_START) {
            const remainder: string = words.slice(1, words.length).reduce((a, b) => a + b);
            const evaluated = math.eval(remainder);

            return new SimpleResponse(
                "otario.mathjs.evaluated",
                [evaluated + ""]
            );
        }

        return new Silence();
    }
}
