import "jest";
import {SubstractionNeuron} from "./SubstractionNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Subtraction neuron", () => {

    const locale: string = "en";
    let neuron: SubstractionNeuron = new SubstractionNeuron();

    it("should be able to subtract two numbers", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["2", "-", "3"], param: "-1"},
            {input: ["12.60", "-", "32.20"], param: "-19.6"},
            {input: ["12.62", "-", "2.22"], param: "10.4"},
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.subtraction");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });

    it("should ignore middle words", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["subtract", "2", "and", "3"], param: "-1"},
            {input: ["-", "2", "3"], param: "-1"}
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, locale, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.subtraction");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });

});


