import "jest";
import {IHiveMind} from "./HiveMind";
import {HiveMindBuilder} from "./HiveMindBuilder";
import {IHiveResponse} from "./HiveResponse";
import {INeuronsResponse} from "./NeuronsResponse";
require("babel-core/register");
require("babel-polyfill");
var chai = require('chai');

describe("HiveMind", () => {

    let mind: IHiveMind;
    const locale: string = "en";

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

        const promises = [];
        inputs.forEach(input => {
            const responsePromise = mind.process(input.input, locale, null);

            responsePromise.then((response: IHiveResponse) => {
                expect(response.response()).toBe(input.response)
            })

            promises.push(responsePromise);
        });

        return Promise.all(promises);
    });

    it("should be able to have a conversation", function () {
        const inputs: {input: string, response: string}[] = [
            {input: "wie ben je", response: "oratio.core.identity"},
            //{input: "yo yo, alles goed? hoe is het? wie ben je", response: "oratio.core.identity"},
            {input: "hoe laat is het", response: "oratio.core.currentTime"},
            {input: "hallo", response: "oratio.core.hello"},
            {input: "2 + 3", response: "oratio.math.addition"},
            {input: "bereken: (4 + 3) / 2", response: "oratio.mathjs.evaluated"},
            {input: "9 * 3", response: "oratio.math.multiplication"},
            {input: "hallo", response: "oratio.core.hello"},
            {input: "hoe laat is het", response: "oratio.core.currentTime"},
            {input: "bereken: (4 + 3) + 4", response: "oratio.mathjs.evaluated"},
            {input: "2 + 3", response: "oratio.math.addition"},
        ];


        const promises = [];
        inputs.forEach(input => {
            promises.push(mind.process(input.input, "nl", null));
        });

        return Promise.all(promises).then((allResponses: IHiveResponse[]) => {
            for (let i = 0; i < allResponses.length; i++) {
                chai.assert(allResponses[i].response() === inputs[i].response, "[" + i + "] expect input " + inputs[i].input + " to give " + inputs[i].response)
            }
        });
    });

});

