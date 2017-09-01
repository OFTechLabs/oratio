import { SimpleResponse } from './neurons/responses/SimpleResponse';
import { UnderstoodResponseFactory } from './UnderstoodResponseFactory';
import { UnderstoodResponse } from './HiveResponse';
import { ActionResponse } from './neurons/responses/ActionResponse';
import { ActionWithContextResponse } from './neurons/responses/ActionWithContextResponse';

describe('UnderstoodResponseFactory', () => {

    it('should be able to create single simple response', () => {
        const response = new SimpleResponse(
            'totranlate',
            [],
            0.8
        );
        const result = UnderstoodResponseFactory.createSingle(response, {totranlate: 'translated'})

        expect(result.response()).toBe('translated');

        expect((result.single() as UnderstoodResponse).certainty).toBe(0.8);
    });

    it('should be able to create single response with action', function () {
        const action = () => '';
        const response = new ActionResponse(
            'totranslate',
            [],
            0.9,
            action
        );

        const result = UnderstoodResponseFactory.createSingle(response, {totranslate: 'translated'})

        expect(result.response()).toBe('translated');

        expect((result.single() as UnderstoodResponse).certainty).toBe(0.9);
        expect((result.single() as UnderstoodResponse).action).toBe(action);
    });

    it('should be able to create single response with action and context', function () {
        const context = {service: {}};
        const action = () => '';
        const response = new ActionWithContextResponse(
            'totranslate',
            [],
            0.99,
            action,
            context
        );

        const result = UnderstoodResponseFactory.createSingle(response, {totranslate: 'translated'})

        expect(result.response()).toBe('translated');

        expect((result.single() as UnderstoodResponse).certainty).toBe(0.99);
        expect((result.single() as UnderstoodResponse).action).toBe(action);
        expect((result.single() as UnderstoodResponse).context).toBe(context);
    });

    it('should be able to create multiple', function () {
        const response = new SimpleResponse(
            'totranlate',
            [],
            0.8
        );
        const result = UnderstoodResponseFactory.createMultiple([response, response], {totranlate: 'translated'})

        expect(result.response()).toBe('translated');

        expect(result.responses().length).toBe(2);
    });

})
