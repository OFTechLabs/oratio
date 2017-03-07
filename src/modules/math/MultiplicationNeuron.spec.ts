import "jest";
import {MultiplicationNeuron} from "./MultiplicationNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {GeneralTestMethods} from "../generalTestMethods.spec";
require("babel-core/register");
require("babel-polyfill");

describe("Multiplication neuron", () => {

    let generalTestMethods : GeneralTestMethods;
    let generalTestMethodsNL : GeneralTestMethods;
    const expectedResponse : string = "oratio.math.multiplication";

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new MultiplicationNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(new MultiplicationNeuron()).withLocale("nl");
    });

    it("should be able to handle 9 * 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("9 * 3", expectedResponse, "27");
    });

    it("should be able to handle 100 * 22", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("100 * 22", expectedResponse, "2200");
    });

    it("should be able to handle 0.5 * 2000", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("0.5 * 2000", expectedResponse, "1000");
    });

    it("should be able to handle multiply 3 and 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("multiply 3 and 3", expectedResponse, "9");
    });


    it("should be able to handle multiply * 3 1", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("* 3 1", expectedResponse, "3");
    });
});


