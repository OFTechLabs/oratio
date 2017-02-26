import "jest";
import {IHiveMind} from "./HiveMind";
import {HiveMindBuilder} from "./HiveMindBuilder";
require("babel-core/register");
require("babel-polyfill");

describe("HiveMind", () => {

    let mind : IHiveMind;
    const locale : string = "en";

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerCoreModules()
            .registerMathModules()
            .registerMathJsModules()
            .build();
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

