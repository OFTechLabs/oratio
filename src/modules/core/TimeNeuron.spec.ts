import "jest";
import {TimeNeuron} from "./TimeNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";
import {GeneralTestMethods} from "../generalTestMethods.spec";
require("babel-core/register");
require("babel-polyfill");

describe("Time neuron", () => {

    let generalTestMethods : GeneralTestMethods;
    let generalTestMethodsNL : GeneralTestMethods;
    const expectedResponse : string = "oratio.core.currentTime";

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new TimeNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(new TimeNeuron()).withLocale("nl");
    });

    it("should be able to handle current time", function () {
        return generalTestMethods.expectInputToGiveResponseAndHaveParam("current time", expectedResponse);
    });

    it("should be able to handle what time is it", function () {
        return generalTestMethods
            .withMinimumCertainty(0.6)
            .expectInputToGiveResponseAndHaveParam("what time is it", expectedResponse);
    });

    it("should be able to handle tell what time is it", function () {
        return generalTestMethods
            .withMinimumCertainty(0.6)
            .expectInputToGiveResponseAndHaveParam("tell me what time it is", expectedResponse);
    });


    it("should be able to localize", function () {
        return generalTestMethodsNL.expectInputToGiveResponseAndHaveParam("hoe lata is het", expectedResponse);
    });
});