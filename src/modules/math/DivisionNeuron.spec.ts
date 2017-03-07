import "jest";
import {DivisionNeuron} from "./DivisionNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {GeneralTestMethods} from "../generalTestMethods.spec";
require("babel-core/register");
require("babel-polyfill");

describe("Divison neuron", () => {

    let generalTestMethods : GeneralTestMethods;
    let generalTestMethodsNL : GeneralTestMethods;
    const expectedResponse : string = "oratio.math.division";

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new DivisionNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(new DivisionNeuron()).withLocale("nl");
    });

    it("should be able to handle 9 / 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("9 / 3", expectedResponse, "3");
    });

    it("should be able to handle 100 / 22", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("100 / 22", expectedResponse, "4.55");
    });

    it("should be able to handle 1000 / 2000", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("1000 / 2000", expectedResponse, "0.5");
    });

    it("should be able to handle divide 3 by 3", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("divide 3 by 3", expectedResponse, "1");
    });

    it("should be able to handle / 3 1", function () {
        return generalTestMethods.expectInputToGiveResponseAndParam("/ 3 1", expectedResponse, "3");
    });
});


