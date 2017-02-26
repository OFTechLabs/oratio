import {INeuronResponse} from "./SimpleResponse";

export class Silence implements INeuronResponse {
    public hasAnswer(): boolean {
        return false;
    }
}
