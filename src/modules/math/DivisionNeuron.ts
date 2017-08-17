import { BaseMathNeuron } from "./BaseMathNeuron";
import { IHiveMindNeuron } from "../../emergent/HiveMindNeurons";
import { INeuronResponse } from "../../emergent/neurons/responses/SimpleResponse";
import { RequestContext } from "../../emergent/RequestContext";
import { knownWords } from "./DivisionNeuron.words";

export class DivisionNeuron implements IHiveMindNeuron {
  public process(
    words: string[],
    locale: string,
    context: RequestContext
  ): Promise<INeuronResponse> {
    const localizedKnownWords: string[] = knownWords.main[locale].words;

    return new BaseMathNeuron(
      localizedKnownWords,
      "oratio.math.division",
      (a, b) => a / b
    ).process(words, locale, context);
  }
}
