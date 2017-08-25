import 'jest';
import {GreetingNeuron} from './GreetingNeuron';
import {GeneralTestMethods} from '../generalTestMethods.spec';
import {BasicLocale} from "../../language/i18n/BasicLocale";

describe('Greeting neuron', () => {
    let generalTestMethods: GeneralTestMethods;
    let generalTestMethodsNL: GeneralTestMethods;
    const expectedResponse: string = 'oratio.core.hello';

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new GreetingNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(
            new GreetingNeuron(),
        ).withLocale(new BasicLocale('nl', 'nl'));
    });

    it('should be able to handle hello', function () {
        return generalTestMethods.expectInputToGiveResponse(
            'hello',
            expectedResponse,
        );
    });

    it('should be able to handle hi', function () {
        return generalTestMethods.expectInputToGiveResponse(
            'hi',
            expectedResponse,
        );
    });

    it('should be able to handle my name is', function () {
        return generalTestMethods.expectInputToGiveResponse(
            'my name is',
            expectedResponse,
        );
    });

    it('should be able to localize I', function () {
        return generalTestMethodsNL.expectInputToGiveResponseAndParam(
            'hlalo mijn naam is Jacob',
            expectedResponse,
            'Jacob',
        );
    });

    it('should be able to localize I', function () {
        return generalTestMethodsNL.expectInputToGiveResponseAndParam(
            'mijn naam is Jacob',
            expectedResponse,
            'Jacob',
        );
    });

    it('should be able to greet with param I', function () {
        return generalTestMethods.expectInputToGiveResponseAndParam(
            'hlelo my name is Jacob',
            expectedResponse,
            'Jacob',
        );
    });

    it('should be able to greet with param II', function () {
        return generalTestMethods.expectInputToGiveResponseAndParam(
            'my name is Jacob',
            expectedResponse,
            'Jacob',
        );
    });

    it('should not match unkown input I', function () {
        return generalTestMethodsNL.expectInputToGiveSilence('hoe laat is het');
    });

    it('should not match unkown input II', function () {
        return generalTestMethodsNL.expectInputToGiveSilence(
            'hoe laat is het nu',
        );
    });
});
