import {INeuronResponse} from './neurons/responses/SimpleResponse';
import {UserInput} from "./BasicUserInput";
import {RequestContext} from "./BasicRequestContext";
import { IHiveMindNeuron } from './hivemind/neurons/HiveMindNeurons';

export class SilenceNeuron implements IHiveMindNeuron {
    public static INSTANCE = new SilenceNeuron();

    process(userInput: UserInput,
            context: RequestContext,): Promise<INeuronResponse> {
        throw new Error(
            'This is just a marker neuron to indicate no neuron handled a certain input.',
        );
    }
}
