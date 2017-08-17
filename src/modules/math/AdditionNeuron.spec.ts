import "jest";
import { AdditionNeuron } from "./AdditionNeuron";
import { GeneralTestMethods } from "../generalTestMethods.spec";

describe("Addition neuron", () => {
  let generalTestMethods: GeneralTestMethods;
  let generalTestMethodsNL: GeneralTestMethods;
  const expectedResponse: string = "oratio.math.addition";

  beforeEach(function() {
    generalTestMethods = GeneralTestMethods.create(new AdditionNeuron());
    generalTestMethodsNL = GeneralTestMethods.create(
      new AdditionNeuron()
    ).withLocale("nl");
  });

  it("should be able to handle 2 + 3", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "2 + 3",
      expectedResponse,
      "5"
    );
  });

  it("should be able to handle 12.60 + 32.20", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "12.60 + 32.20",
      expectedResponse,
      "44.8"
    );
  });

  it("should be able to handle 12.62 + 32.22", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "12.62 + 32.22",
      expectedResponse,
      "44.84"
    );
  });

  it("should be able to handle add 2 plus 3", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "add 2 plus 3",
      expectedResponse,
      "5"
    );
  });

  it("should be able to handle add 2 and 3", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "add 2 and 3",
      expectedResponse,
      "5"
    );
  });

  it("should be able to handle add 2 to 3", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "add 2 to 3",
      expectedResponse,
      "5"
    );
  });

  it("should be able to handle + 2 3", function() {
    return generalTestMethods.expectInputToGiveResponseAndParam(
      "+ 2 3",
      expectedResponse,
      "5"
    );
  });
});
