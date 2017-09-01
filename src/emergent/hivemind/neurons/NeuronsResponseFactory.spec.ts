import { TimeNeuron } from '../../../modules/core/TimeNeuron';
import { SimpleResponse } from '../../neurons/responses/SimpleResponse';
import { NeuronsResponseFactory } from './NeuronsResponseFactory';
import { SingleNeuronsResponse } from './NeuronsResponse';
import { GreetingNeuron } from '../../../modules/core/GreetingNeuron';

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

    it('should be able to create mutliple', function () {
        const mostCertainNeuron = new GreetingNeuron();
        const timeNeuron = new TimeNeuron();
        const timeResponse5 = new SimpleResponse('response0.5', [], 0.5);
        const timeResponse3 = new SimpleResponse('response0.3', [], 0.3);
        const timeResponse31 = new SimpleResponse('response0.31', [], 0.31);
        const timeResponse29 = new SimpleResponse('response0.29', [], 0.29);
        const mostCertainNeuron9 = new SimpleResponse('response0.9', [], 0.9);

        const result = NeuronsResponseFactory.createMultiple(
            [
                new SingleNeuronsResponse(timeNeuron, timeResponse5),
                new SingleNeuronsResponse(timeNeuron, timeResponse3),
                new SingleNeuronsResponse(timeNeuron, timeResponse31),
                new SingleNeuronsResponse(timeNeuron, timeResponse29),
                new SingleNeuronsResponse(mostCertainNeuron, mostCertainNeuron9),
            ]
        )

        expect(result.getResponses().length).toBe(5);

        expect(result.getResponses()[0].getResponse().getCertainty()).toBe(0.9);
        expect(result.getResponses()[1].getResponse().getCertainty()).toBe(0.5);
        expect(result.getResponses()[2].getResponse().getCertainty()).toBe(0.31);
        expect(result.getResponses()[3].getResponse().getCertainty()).toBe(0.3);
        expect(result.getResponses()[4].getResponse().getCertainty()).toBe(0.29);

        expect(result.getMostCertainResponse().getFiredNeuron()).toBe(mostCertainNeuron);
        expect(result.getMostCertainResponse().getResponse().getCertainty()).toBe(0.9);
        expect((result.getMostCertainResponse().getResponse() as SimpleResponse).response).toBe('response0.9');
    });

});
