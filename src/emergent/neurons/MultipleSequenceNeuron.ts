import { LevenshteinDistanceMatcher } from "../../language/words/LevenshteinDistanceMatcher";
import { Silence } from "./responses/Silence";
import { INeuronResponse, SimpleResponse } from "./responses/SimpleResponse";
import { IHiveMindNeuron } from "../HiveMindNeurons";
import { NumberOfKnownWordsCertaintyCalculator } from "../../language/sequences/NumberOfKnownWordsCertaintyCalculator";

export class MultipleSequenceNeuron implements IHiveMindNeuron {
  private knownWords: string[];
  private knownTwoWordSequences: string[];
  private knownThreeWordSequences: string[];
  private knownFourWordSequences: string[];
  private response: string;

  constructor(
    knownWords: string[],
    knownTwoWordSequences: string[],
    knownThreeWordSequences: string[],
    knownFourWordSequences: string[],
    response: string
  ) {
    this.knownWords = knownWords;
    this.knownTwoWordSequences = knownTwoWordSequences;
    this.knownThreeWordSequences = knownThreeWordSequences;
    this.knownFourWordSequences = knownFourWordSequences;
    this.response = response;
  }

  public process(
    input: string[],
    locale: string,
    context: any
  ): Promise<INeuronResponse> {
    let maxCertainty = 0.0;

    for (const knownWord of this.knownWords) {
      for (const inputWord of input) {
        if (LevenshteinDistanceMatcher.MATCHER.matches(inputWord, knownWord)) {
          maxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
            1,
            input
          );
        }
      }
    }

    for (const sequence of this.knownTwoWordSequences) {
      for (let j = 0; j < input.length - 1; j++) {
        const sequenceTogether = input[j] + input[j + 1];

        if (
          LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)
        ) {
          maxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
            2,
            input
          );
        }
      }
    }

    for (const sequence of this.knownThreeWordSequences) {
      for (let j = 0; j < input.length - 2; j++) {
        const sequenceTogether = input[j] + input[j + 1] + input[j + 2];

        if (
          LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)
        ) {
          maxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
            3,
            input
          );
        }
      }
    }

    for (const sequence of this.knownFourWordSequences) {
      for (let j = 0; j < input.length - 3; j++) {
        const sequenceTogether =
          input[j] + input[j + 1] + input[j + 2] + input[j + 3];

        if (
          LevenshteinDistanceMatcher.MATCHER.matches(sequenceTogether, sequence)
        ) {
          maxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
            4,
            input
          );
        }
      }
    }

    if (maxCertainty > 0) {
      return Promise.resolve(
        new SimpleResponse(this.response, [], maxCertainty)
      );
    }

    return Promise.resolve(new Silence());
  }
}
