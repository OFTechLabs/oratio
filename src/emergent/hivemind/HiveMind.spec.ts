import 'jest';
import { IHiveMind } from './HiveMind';
import { HiveMindBuilder } from './HiveMindBuilder';
import { BasicLocale, Locale } from '../../language/i18n/BasicLocale';
import { CoreHiveMindModule } from '../../modules/core/CoreHiveMindModule';
import { MathHiveMindModule } from '../../modules/math/MathHiveMindModule';
import { HiveMindGenericTest } from './HiveMindGenericTest.spec';

const chai = require('chai');

describe('HiveMind', () => {
    let mind: IHiveMind;
    const locale: Locale = new BasicLocale('en', 'uk');

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
            .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
            .build();
    });

    it('should process neurons correctly', function () {
        const inputs: { input: string; response: string }[] = [
            {input: 'who are you', response: 'oratio.core.identity'},
            {input: 'what time is it', response: 'oratio.core.currentTime'},
        ];

        const promises = HiveMindGenericTest.testForInputWithResponse(mind, inputs);

        return Promise.all(promises);
    });

    it('should process unknown locale', function () {
        const inputs: { input: string; response: string }[] = [
            {input: 'who are you', response: 'oratio.did.not.understand'},
            {input: 'what time is it', response: 'oratio.did.not.understand'},
        ];

        const promisesNullLocale = HiveMindGenericTest.testForInputWithLocale(mind, inputs, null);
        const promisesUnkownLocale = HiveMindGenericTest.testForInputWithLocale(mind, inputs, new BasicLocale('xx', 'yy'));

        return Promise.all(promisesNullLocale.concat(promisesUnkownLocale));
    });

    it('should be able to have a conversation', function () {
        const inputs: { input: string; response: string }[] = [
            {input: 'wie ben je', response: 'oratio.core.identity'},
            {input: 'hoe laat is het', response: 'oratio.core.currentTime'},
            {input: 'en nu', response: 'oratio.core.currentTime'},
            {input: 'hallo', response: 'oratio.core.hello'},
            {input: '2 + 3', response: 'oratio.math.addition'},
            {
                input: '3 / 2',
                response: 'oratio.math.division',
            },
            {input: '9 * 3', response: 'oratio.math.multiplication'},
            {input: 'hallo', response: 'oratio.core.hello'},
            {input: 'hoe laat is het', response: 'oratio.core.currentTime'},
            {
                input: '2 - 3',
                response: 'oratio.math.subtraction',
            },
            {input: '2 + 3', response: 'oratio.math.addition'},
        ];

        return HiveMindGenericTest.testConversation(mind, inputs, new BasicLocale('nl', 'nl'));
    });
});
