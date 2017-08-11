import "jest";
import {MathJSNeuron} from "./MathJSNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {GeneralTestMethods} from "../generalTestMethods.spec";
import {HiveMindInputNode} from "../../emergent/HiveMindInputNode";
import {RequestContext} from "../../emergent/RequestContext";
require("babel-core/register");
require("babel-polyfill");
require('mathjs');

describe("MathJS Neuron", () => {

    let generalTestMethods : GeneralTestMethods;
    let generalTestMethodsNL : GeneralTestMethods;
    const expectedResponse : string = "oratio.mathjs.evaluated";

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new MathJSNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(new MathJSNeuron()).withLocale("nl");
    });

    it("should be able to handle math: (9 * 3) / 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("math: (9 * 3) / 3", expectedResponse, "9");
    });

    it("should be able to handle continuations", function () {
        const previousInput: string[] = "math: (9 * 3) / 3".split(" ");

        const previous = new HiveMindInputNode(null, new MathJSNeuron(), previousInput);
        const context = new RequestContext(previous, null);

        return generalTestMethods.expectInputAndContextToGiveResponseWithParam("and (9 * 3) / 3", context, expectedResponse, "9");
    });

    it("should be able to handle math: 100 * 22", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("math: 100 * 22", expectedResponse, "2200");
    });

    it("should be able to handle math: -0.5 * 2000", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("math: -0.5 * 2000", expectedResponse, "-1000");
    });

    it("should be able to handle math: (1000 / 25) * ((24 + 15) / 5) - (21 + 43)", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("math: (1000 / 25) * ((24 + 15) / 5) - (21 + 43)", expectedResponse, "248");
    });


    it("should be able to localize bereken: 100 * 22", function () {
        return generalTestMethodsNL.expectInputToGiveResponseAndParam("bereken: 100 * 22", expectedResponse, "2200");
    });
});


