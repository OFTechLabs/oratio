import { TimeNeuron } from '../../../modules/core/TimeNeuron';
import { SimpleResponse } from '../../neurons/responses/SimpleResponse';
import { NeuronsResponseFactory } from './NeuronsResponseFactory';

describe('NeuronsResponseFactory', () => {

    it('should be able to create', function () {
        const timeNeuron = new TimeNeuron();
        const timeResponse = new SimpleResponse('response', [], 0.9);

        const result = NeuronsResponseFactory.create(timeNeuron, timeResponse);

        expect(result.getMostCertainResponse().getFiredNeuron()).toBe(timeNeuron);
        expect(result.getMostCertainResponse().getResponse()).toBe(timeResponse);

        expect(result.getResponses().length).toBe(1);
        expect(result.getResponses()[0].getFiredNeuron()).toBe(timeNeuron);
        expect(result.getResponses()[0].getResponse()).toBe(timeResponse);

    });

});
