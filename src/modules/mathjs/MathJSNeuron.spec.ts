import "jest";
import {MathJSNeuron} from "./MathJSNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");
require('mathjs');

describe("MathJS Neuron", () => {

    let neuron: MathJSNeuron = new MathJSNeuron();

    it("should be able to evaluate with mathjs", function () {
        const longerExpresion: string = "math: (1000 / 25) * ((24 + 15) / 5) - (21 + 43)";

        const inputs: {input: string[], param: string}[] = [
            {input: ["math:", "(9", "*", "3)", "/", "3"], param: "9"},
            {input: ["math:", "100", "*", "22"], param: "2200"},
            {input: ["math:", "0.5", "*", "2000"], param: "1000"},
            {input: longerExpresion.split(" "), param: "248"},
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.mathjs.evaluated");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });
});


