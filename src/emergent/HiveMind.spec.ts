import "jest";
import {IHiveMind, BasicHiveMind} from "./HiveMind";
import {BasicHiveMindNeurons} from "./HiveMindNeurons";
import {IdentityNeuron} from "../modules/core/IdentityNeuron";
import {TimeNeuron} from "../modules/core/TimeNeuron";
require("babel-core/register");
require("babel-polyfill");

describe("HiveMind", () => {

    let mind : IHiveMind;
    const locale : string = "en";

    beforeEach(function () {
        const neurons = new BasicHiveMindNeurons([
            new IdentityNeuron(),
            new TimeNeuron
        ]);

        mind = new BasicHiveMind(neurons);
    });

    it("should process neurons correctly", function () {
        const inputs: {input: string, response: string}[] = [
            {input: "who are you", response: "oratio.core.identity"},
            {input: "what time is it", response: "oratio.core.currentTime"}
        ];


        inputs.forEach(input => {
            const response = mind.process(input.input, locale, null);

            expect(response.response()).toBe(input.response)
        })
    });

});
