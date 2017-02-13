import "jest";
import {IdentityNeuron} from "./IdentityNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Identity neuron", () => {

    it("should know what to do with identity", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["what", "identity", "you"], null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
    });

    it("should know what to do with who are you", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["who", "are", "you"], null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
    });

    it("should know what to do with what are you", () => {
        const neuron = new IdentityNeuron();

        const response = neuron.process(["what", "are", "you"], null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
    });

    it("should know what to do even with lots of noise", () => {
        const neuron = new IdentityNeuron();

        let words: string[] = "Hello I am a Human, what are you?".split(" ");

        const response = neuron.process(words, null);
        expect(response.hasAnswer()).toBeTruthy();

        const simpleResponse = <SimpleResponse> response;

        expect(simpleResponse.response).toBe("oratio.core.identity");
    });

    it("should not know what to do with unrelated questions", () => {
        const neuron = new IdentityNeuron();

        let words: string[] = "What is the time?".split(" ");

        const response = neuron.process(words, null);
        expect(response.hasAnswer()).toBeFalsy();
    });
});
