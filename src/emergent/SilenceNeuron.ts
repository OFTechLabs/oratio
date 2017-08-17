import { IHiveMindNeuron } from "./HiveMindNeurons"
import { RequestContext } from "./RequestContext"
import { INeuronResponse } from "./neurons/responses/SimpleResponse"

export class SilenceNeuron implements IHiveMindNeuron {
  public static INSTANCE = new SilenceNeuron()

  process(
    words: string[],
    locale: string,
    context: RequestContext
  ): Promise<INeuronResponse> {
    throw new Error(
      "This is just a marker neuron to indicate no neuron handled a certain input."
    )
  }
}
