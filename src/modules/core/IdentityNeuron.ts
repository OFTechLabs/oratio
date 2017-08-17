import { MultipleSequenceNeuron } from "../../emergent/neurons/MultipleSequenceNeuron"
import { SequenceParser } from "../../language/sequences/SequenceParser"
import { Sequence } from "../../language/sequences/Sequence"
import { IHiveMindNeuron } from "../../emergent/HiveMindNeurons"
import { INeuronResponse } from "../../emergent/neurons/responses/SimpleResponse"
import { RequestContext } from "../../emergent/RequestContext"
import { knownWords } from "./IdentityNeuron.words"

export class IdentityNeuron implements IHiveMindNeuron {
  public process(
    words: string[],
    locale: string,
    context: RequestContext
  ): Promise<INeuronResponse> {
    const localizedKnownWords: string[] = knownWords.main[locale].words
    const sequences = SequenceParser.parse(localizedKnownWords)

    return new MultipleSequenceNeuron(
      sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.fourWords.map((sequence: Sequence) => sequence.withoutSpaces),
      "oratio.core.identity"
    ).process(words, locale, context)
  }
}
