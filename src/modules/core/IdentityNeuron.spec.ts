import "jest";
import {IdentityNeuron} from "./IdentityNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Identity neuron", () => {

    const locale = "en";

    it("should know what to do with identity", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["identity"], locale, null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
        expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
    });

    it("should know what to do with who are you", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["who", "are", "you"], locale, null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
        expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
    });

    it("should know what to do with what are you", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["what", "are", "you"], locale, null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
        expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
    });

    it("should be able to use localization", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["wat", "ben", "je"], "nl", null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
        expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
    });

    it("should not match wrong input", function () {
        const neuron = new IdentityNeuron();

        const userInput: string[][] = [
            ["hoe laat is het"],
            ["hoe laat is het nu"],
        ];

        userInput.forEach(input => {
            const response = neuron.process(input, "nl", null);
            expect(response.hasAnswer()).toBeFalsy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe(undefined);
            expect(simpleResponse.getCertainty()).toBe(0);
        })

    });

    it("should know what to do even with lots of noise", () => {
        const neuron = new IdentityNeuron();

        let words: string[] = "Hello I am a Human, what are you?".split(" ");

        const response = neuron.process(words, locale, null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
        expect(simpleResponse.getCertainty()).toBeGreaterThan(0.0);
    });

    it("should not know what to do with unrelated questions", () => {
        const neuron = new IdentityNeuron();

        let words: string[] = "What is the time?".split(" ");


        const response = neuron.process(words, locale, null);
        expect(response.hasAnswer()).toBeFalsy();
        expect(response.getCertainty()).toBe(0);
    });
});