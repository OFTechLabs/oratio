import "jest";
import {SubstractionNeuron} from "./SubstractionNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {GeneralTestMethods} from "../generalTestMethods.spec";
require("babel-core/register");
require("babel-polyfill");

describe("Subtraction neuron", () => {

    let generalTestMethods : GeneralTestMethods;
    let generalTestMethodsNL : GeneralTestMethods;
    const expectedResponse : string = "oratio.math.subtraction";

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new SubstractionNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(new SubstractionNeuron()).withLocale("nl");
    });

    it("should be able to handle 2 - 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("2 - 3", expectedResponse, "-1");
    });

    it("should be able to handle 12.60 - 32.20", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("12.60 - 32.20", expectedResponse, "-19.6");
    });

    it("should be able to handle 12.62 - 2.22", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("12.62 - 2.22", expectedResponse, "10.4");
    });

    it("should be able to handle substract 2 and 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("substract 2 and 3", expectedResponse, "-1");
    });

    it("should be able to handle - 3 2", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("- 3 2", expectedResponse, "1");
    });
});


