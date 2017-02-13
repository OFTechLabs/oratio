import "jest";
import {AdditionNeuron} from "./AdditionNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Addition neuron", () => {

    let neuron: AdditionNeuron = new AdditionNeuron();

    it("should be able to add two numbers", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["2", "+", "3"], param: "5"},
            {input: ["12.60", "+", "32.20"], param: "44.8"},
            {input: ["12.62", "+", "32.22"], param: "44.84"},
            {input: ["add", "2", "+", "3"], param: "5"},
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.addition");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });

    it("should ignore middle words", function () {
        const inputs: {input: string[], param: string}[] = [
            {input: ["add", "2", "and", "3"], param: "5"},
            {input: ["add", "2", "to", "3"], param: "5"},
            {input: ["+", "2", "3"], param: "5"}
        ];

        inputs.forEach(input => {
            const response = neuron.process(input.input, "");

            expect(response.hasAnswer()).toBeTruthy();

            const simleResponse = <SimpleResponse> response;

            expect(simleResponse.response).toBe("otario.math.addition");
            expect(simleResponse.params.length).toBe(1);
            expect(simleResponse.params[0]).toBe(input.param);
        })
    });
});