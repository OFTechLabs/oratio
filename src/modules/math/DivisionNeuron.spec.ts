import "jest";
import {DivisionNeuron} from "./DivisionNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Divison neuron", () => {

    const locale: string = "en";
    let neuron: DivisionNeuron = new DivisionNeuron();

    it("should be able to divide two numbers", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["9", "/", "3"], param: "3"},
            {input: ["100", "/", "22"], param: "4.55"},
            {input: ["1000", "/", "2000"], param: "0.5"},
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("otario.math.division");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe(input.param);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
        })
    });

    it("should ignore middle words", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["divide", "3", "by", "3"], param: "1"},
            {input: ["/", "3", "1"], param: "3"}
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("otario.math.division");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe(input.param);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
        })
    });

});


