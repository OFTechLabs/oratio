import { MultipleSequenceNeuron } from "../../emergent/neurons/MultipleSequenceNeuron"
import {
  INeuronResponse,
  SimpleResponse
} from "../../emergent/neurons/responses/SimpleResponse"
import { WordAfterSequenceParser } from "../../language/parsers/parameters/WordAfterSequenceParser"
import { SequenceParser } from "../../language/sequences/SequenceParser"
import { Sequence } from "../../language/sequences/Sequence"
import { IHiveMindNeuron } from "../../emergent/HiveMindNeurons"
import { RequestContext } from "../../emergent/RequestContext"
import { knownWords } from "./GreetingNeuron.words"

export class GreetingNeuron implements IHiveMindNeuron {
  public process(
    words: string[],
    locale: string,
    context: RequestContext
  ): Promise<INeuronResponse> {
    const localizedKnownWords: string[] = knownWords.main[locale].words
    const sequences = SequenceParser.parse(localizedKnownWords)

    const initialResponsePromise: Promise<
      INeuronResponse
    > = new MultipleSequenceNeuron(
      sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
      [],
      "oratio.core.hello"
    ).process(words, locale, context)

    return initialResponsePromise.then((initialResponse: INeuronResponse) => {
      if (initialResponse instanceof SimpleResponse) {
        const localizedKnownParams: string[] = knownWords.params[locale].words
        const paramSequences = SequenceParser.parse(localizedKnownParams)
        const newCertainty =
          (initialResponse.getCertainty() * words.length + 1) / words.length

        const parser = new WordAfterSequenceParser(
          paramSequences.sequences.map((sequence: Sequence) =>
            sequence.sequence.split(" ")
          )
        )

        return Promise.resolve(
          initialResponse
            .withParams(parser.parse(words))
            .withCertainty(newCertainty)
        )
      }

      return Promise.resolve(initialResponse)
    })
  }
}
