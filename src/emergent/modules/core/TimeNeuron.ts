import {HiveMindNeuron} from "../../neurons/HiveMindNeuron";
import {MultipleSequenceNeuron} from "../../neurons/MultipleSequenceNeuron";
import {NeuronResponse} from "../../neurons/responses/NeuronResponse";
import {SimpleResponse} from "../../neurons/responses/SimpleResponse";

export class TimeNeuron implements HiveMindNeuron {

    private static KNOWN_TWO_WORD_SEQUENCES: string[] = ["currenttime"];
    private static KNOWN_FOUR_WORD_SEQUENCES: string[] = ["whattimeisit"];

    public process(input: string[], context: string): NeuronResponse {
        const initialResponse = (new MultipleSequenceNeuron(
            [],
            TimeNeuron.KNOWN_TWO_WORD_SEQUENCES,
            [],
            TimeNeuron.KNOWN_FOUR_WORD_SEQUENCES,
            "oratio.currentTime"))
            .process(input, context);

        if (initialResponse instanceof SimpleResponse) {
            const date = new Date();
            const time = date.getHours() + ":" + date.getMinutes();

            return initialResponse.withParams([time]);
        }

        return initialResponse;
    }

}
