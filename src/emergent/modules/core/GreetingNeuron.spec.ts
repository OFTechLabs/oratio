import "jest";
import {GreetingNeuron} from "./GreetingNeuron";
import {SimpleResponse} from "../../neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Identity neuron", () => {

    let greetingNeuron : GreetingNeuron;

    beforeEach(function () {
        greetingNeuron = new GreetingNeuron();
    });

    it("should be able to greet", function () {

        const userInput : string[][] = [
            ["hlelo"],
            ["hi"],
            ["my", "name", "is"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.hello");
        })

    });

    it("should be able to greet with name", function () {

        const userInput : string[][] = [
            ["hlelo", "my", "name", "is", "Jacob"],
            ["my", "name", "is", "Jacob"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.hello");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe("Jacob");
        })

    });

});