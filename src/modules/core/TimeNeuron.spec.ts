import "jest";
import {TimeNeuron} from "./TimeNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
require("babel-core/register");
require("babel-polyfill");

describe("Identity neuron", () => {

    it("should be able to give the time", () => {
        const neuron = new TimeNeuron();

        const inputs : string[][] = [
            ["current", "time"],
            ["what", "time", "is", "it"],
            ["wgat", "tmie", "is", "it"],
            ["can", "you", "tell", "me", "what", "time", "it", "is"]
        ];

        inputs.forEach(input => {
            const response = neuron.process(input, null);
            expect(response.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe("oratio.currentTime");
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0].length).toBeGreaterThan(3);
        })
    });

});