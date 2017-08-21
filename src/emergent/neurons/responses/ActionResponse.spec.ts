import {ActionResponse} from "./ActionResponse";

describe('ActionResponse', () => {

    let called = false;

    const action: () => void = () => {
        called = true;
    }

    it('should be able to return callable action', function () {
        const response = new ActionResponse(
            'response',
            ['A'],
            0.8,
            action
        );

        expect(called).toBeFalsy();
        expect(response.hasAnswer()).toBeTruthy();
        expect(response.response).toBe('response');
        expect(response.params.length).toBe(1);
        expect(response.params[0]).toBe('A');
        expect(response.getCertainty()).toBe(0.8);

        response.action();

        expect(called).toBe(true);
    });

});
