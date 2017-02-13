import {IHiveMindNeuron} from "../../emergent/neurons/HiveMindNeuron";
import {NeuronResponse} from "../../emergent/neurons/responses/NeuronResponse";
import {MultipleSequenceNeuron} from "../../emergent/neurons/MultipleSequenceNeuron";
import {SimpleResponse} from "../../emergent/neurons/responses/SimpleResponse";

export class TimeNeuron implements IHiveMindNeuron {

    private static KNOWN_TWO_WORD_SEQUENCES: string[] = ["currenttime"];
    private static KNOWN_FOUR_WORD_SEQUENCES: string[] = ["whattimeisit"];

    public process(input: string[], context: string): NeuronResponse {
        const initialResponse = (new MultipleSequenceNeuron(
            [],
            TimeNeuron.KNOWN_TWO_WORD_SEQUENCES,
            [],
            TimeNeuron.KNOWN_FOUR_WORD_SEQUENCES,
            "oratio.core.currentTime"))
            .process(input, context);

        if (initialResponse instanceof SimpleResponse) {
            const date = new Date();
            const time = date.getHours() + ":" + date.getMinutes();

            return initialResponse.withParams([time]);
        }

        return initialResponse;
    }

}
