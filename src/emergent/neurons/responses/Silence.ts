import { INeuronResponse } from './SimpleResponse';

export class Silence implements INeuronResponse {
    public hasAnswer(): boolean {
        return false;
    }

    public getCertainty(): number {
        return 0;
    }
}
