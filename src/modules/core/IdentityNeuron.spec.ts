import 'jest';
import { IdentityNeuron } from './IdentityNeuron';
import { GeneralTestMethods } from '../generalTestMethods.spec';

describe('Identity neuron', () => {
    let generalTestMethods: GeneralTestMethods;
    let generalTestMethodsNL: GeneralTestMethods;
    const expectedResponse: string = 'oratio.core.identity';

    beforeEach(function() {
        generalTestMethods = GeneralTestMethods.create(new IdentityNeuron());
        generalTestMethodsNL = GeneralTestMethods.create(
            new IdentityNeuron(),
        ).withLocale('nl');
    });

    it('should know what to do with identity', () => {
        return generalTestMethods.expectInputToGiveResponse(
            'identity',
            expectedResponse,
        );
    });

    it('should know what to do with who are you', () => {
        return generalTestMethods.expectInputToGiveResponse(
            'who are you',
            expectedResponse,
        );
    });

    it('should know what to do with what are you', () => {
        return generalTestMethods.expectInputToGiveResponse(
            'what are you',
            expectedResponse,
        );
    });

    it('should be able to use localization', () => {
        return generalTestMethodsNL.expectInputToGiveResponse(
            'wat ben je',
            expectedResponse,
        );
    });

    it('should not match wrong input', function() {
        return generalTestMethodsNL.expectInputToGiveSilence('hoe laat is het');
    });

    it('should know what to do even with lots of noise', () => {
        return generalTestMethods
            .withMinimumCertainty(0.3)
            .expectInputToGiveResponse(
                'Hello I am a Human, what are you',
                expectedResponse,
            );
    });

    it('should not know what to do with unrelated questions', () => {
        return generalTestMethods.expectInputToGiveSilence('What is the time');
    });
});
