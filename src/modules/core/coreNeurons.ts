import { GreetingNeuron } from "./GreetingNeuron"
import { IdentityNeuron } from "./IdentityNeuron"
import { TimeNeuron } from "./TimeNeuron"
import { IHiveMindNeuron } from "../../emergent/HiveMindNeurons"

export * from "./IdentityNeuron"
export * from "./TimeNeuron"
export * from "./GreetingNeuron"

export class CoreNeurons {
  public static getCoreNeurons(): IHiveMindNeuron[] {
    return [new GreetingNeuron(), new IdentityNeuron(), new TimeNeuron()]
  }
}
