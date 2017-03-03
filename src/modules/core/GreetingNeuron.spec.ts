import "jest";
import {GreetingNeuron} from "./GreetingNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Greeting neuron", () => {

    let greetingNeuron : GreetingNeuron;

    beforeEach(function () {
        greetingNeuron = new GreetingNeuron();
    });

    it("should be able to greet", function () {

        const userInput : string[][] = [
            ["hello"],
            ["hi"],
            ["my", "name", "is"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, "en", null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.core.hello");
        })

    });

    it("should not match wrong input", function () {

        const userInput : string[][] = [
            ["hoe laat is het"],
            ["hoe laat is het nu"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, "nl", null);
            expect(response.hasAnswer()).toBeFalsy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe(undefined);
        })

    });

    it("should be able to greet with name", function () {

        const userInput : string[][] = [
            ["hlelo", "my", "name", "is", "Jacob"],
            ["my", "name", "is", "Jacob"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, "en", null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.core.hello");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe("Jacob");
        })

    });

    it("should be able to localize", function () {

        const userInput : string[][] = [
            ["hlalo", "mijn", "naam", "is", "Jacob"],
            ["mijn", "naam", "is", "Jacob"],
        ];

        userInput.forEach(input => {
            const response = greetingNeuron.process(input, "nl", null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.core.hello");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe("Jacob");
        })

    });

});