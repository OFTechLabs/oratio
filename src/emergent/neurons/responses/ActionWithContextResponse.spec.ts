import {ActionWithContextResponse} from "./ActionWithContextResponse";


describe('ActionResponseWithContext', () => {

    it('should be able to return callable action', function () {
        const scope = new Scope();

        const response = new ActionWithContextResponse(
            'response',
            ['A'],
            0.8,
            action,
            scope
        );

        expect(scope.called).toBeFalsy();
        expect(response.hasAnswer()).toBeTruthy();
        expect(response.response).toBe('response');
        expect(response.params.length).toBe(1);
        expect(response.params[0]).toBe('A');
        expect(response.getCertainty()).toBe(0.8);

        response.action.call(scope);

        expect(scope.called).toBeTruthy();
    });

});

var action = function(){
    this._called = true;
};

class Scope {
    private _called = false;

    get called(): boolean {
        return this._called;
    }
}
