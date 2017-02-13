import {NeuronResponse} from "./NeuronResponse";

export class Silence implements NeuronResponse {
    public hasAnswer(): boolean {
        return false;
    }
}
