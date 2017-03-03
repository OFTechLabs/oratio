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

    it("should be able to have a conversation", function () {
        const inputs: {input: string, response: string}[] = [
            {input: "wie ben je", response: "oratio.core.identity"},
            {input: "yo yo, alles goed? hoe is het? wie ben je", response: "oratio.core.identity"},
            {input: "hoe laat is het", response: "oratio.core.currentTime"},
            {input: "hallo", response: "oratio.core.hello"},
            {input: "2 + 3", response: "otario.math.addition"},
            {input: "bereken: (4 + 3) / 2", response: "otario.mathjs.evaluated"},
            {input: "9 * 3", response: "otario.math.multiplication"},
            {input: "hallo", response: "oratio.core.hello"},
            {input: "hoe laat is het", response: "oratio.core.currentTime"},
            {input: "bereken: (4 + 3) + 4", response: "otario.mathjs.evaluated"},
            {input: "2 + 3", response: "otario.math.addition"},
        ];


        inputs.forEach(input => {
            const response = mind.process(input.input, "nl", null);

            expect(response.response()).toBe(input.response);
        })
    });

});

