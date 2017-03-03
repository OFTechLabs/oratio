import "jest";
import {TimeNeuron} from "./TimeNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Time neuron", () => {

    const locale: string = "en";

    it("should be able to give the time", () => {
        const neuron = new TimeNeuron();

        const inputs : string[][] = [
            ["current", "time"],
            ["what", "time", "is", "it"],
            ["what", "time", "is", "it"],
            ["tell", "what", "time", "it", "is"]
        ];

        inputs.forEach(input => {
            const response = neuron.process(input, locale, null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.core.currentTime");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0].length).toBeGreaterThan(3);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
        })
    });

    it("should be able to localize", () => {
        const neuron = new TimeNeuron();

        const inputs : string[][] = [
            ["hoe", "lata", "is", "het"]
        ];

        inputs.forEach(input => {
            const response = neuron.process(input, "nl", null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.core.currentTime");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0].length).toBeGreaterThan(3);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(0.75);
        })
    });

});