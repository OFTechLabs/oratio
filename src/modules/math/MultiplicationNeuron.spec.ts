import "jest";
import {MultiplicationNeuron} from "./MultiplicationNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Multiplication neuron", () => {

    const locale: string = "en";
    let neuron: MultiplicationNeuron = new MultiplicationNeuron();

    it("should be able to multiply two numbers", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["9", "*", "3"], param: "27"},
            {input: ["100", "*", "22"], param: "2200"},
            {input: ["0.5", "*", "2000"], param: "1000"},
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.multiplication");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });

    it("should ignore middle words", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["multply", "3", "and", "3"], param: "9"},
            {input: ["*", "3", "1"], param: "3"}
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.multiplication");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });

});


