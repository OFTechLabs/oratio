import 'jest';
import {TimeNeuron} from './TimeNeuron';
import {GeneralTestMethods} from '../generalTestMethods.spec';
import {HiveMindInputNode} from '../../emergent/HiveMindInputNode';
import {BasicLocale} from "../../language/i18n/BasicLocale";
import {BasicUserInput, UserInput} from "../../emergent/BasicUserInput";
import {BasicRequestContext} from "../../emergent/BasicRequestContext";

describe('Time neuron', () => {
    let generalTestMethods: GeneralTestMethods;
    let generalTestMethodsNL: GeneralTestMethods;
    const expectedResponse: string = 'oratio.core.currentTime';

    beforeEach(function () {
        generalTestMethods = GeneralTestMethods.create(new TimeNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(
            new TimeNeuron(),
        ).withLocale(new BasicLocale('nl', 'nl'));
    });

    it('should be able to handle current time', function () {
        return generalTestMethods.expectInputToGiveResponseAndHaveParam(
            'current time',
            expectedResponse,
        );
    });

    it('should be able to handle what time is it', function () {
        return generalTestMethods
            .withMinimumCertainty(0.6)
            .expectInputToGiveResponseAndHaveParam(
                'what time is it',
                expectedResponse,
            );
    });

    it('should be able to handle tell what time is it', function () {
        return generalTestMethods
            .withMinimumCertainty(0.6)
            .expectInputToGiveResponseAndHaveParam(
                'tell me what time it is',
                expectedResponse,
            );
    });

    it('should be able to localize', function () {
        return generalTestMethodsNL.expectInputToGiveResponseAndHaveParam(
            'hoe lata is het',
            expectedResponse,
        );
    });

    it('should be able to use history', function () {
        const previousInput: UserInput = new BasicUserInput('hoe laat is het nu?');

        const previous = new HiveMindInputNode(
            null,
            new TimeNeuron(),
            previousInput,
        );
        const context = new BasicRequestContext(previous, null, new BasicLocale('nl', 'nl'));

        return generalTestMethodsNL.expectInputAndContextToGiveResponse(
            'en nu',
            context,
            expectedResponse,
        );
    });
});
