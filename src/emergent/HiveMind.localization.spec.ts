import 'jest';
import {IHiveMind} from './HiveMind';
import {HiveMindBuilder} from './HiveMindBuilder';
import {IHiveResponse} from './HiveResponse';
import {CoreHiveMindModule} from '../modules/core/CoreHiveMindModule';
import {MathHiveMindModule} from '../modules/math/MathHiveMindModule';
import {BasicLocale, Locale} from "../language/i18n/BasicLocale";

var chai = require('chai');

describe('HiveMind localization', () => {
    let mind: IHiveMind;
    const locale: Locale = new BasicLocale('en', 'us');

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE.withTranslations(
                {
                    'oratio.core.currentTime': 'The current time is:',
                    'oratio.core.identity': 'I am Oratio',
                    'oratio.core.hello': 'Hello to you!'
                }
            ))
            .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE.withTranslations(
                {
                    'oratio.math.addition': 'additionzz {0}',
                    'oratio.math.division': 'divisionzz {0}',
                    'oratio.math.multiplication': 'multiplicationzz {0}',
                    'oratio.math.subtraction': 'subtractionzz {0}',
                }
            ))
            .build();
    });

    it('should translate to configured translations', function () {
        const inputs: { input: string; response: string }[] = [
            {input: 'who are you', response: 'I am Oratio'},
            {input: 'what time is it', response: 'The current time is:'},
            {input: 'hello', response: 'Hello to you!'},
            {input: '1 + 1', response: 'additionzz 2'},
            {input: '1 - 1', response: 'subtractionzz 0'},
            {input: '1 * 1', response: 'multiplicationzz 1'},
            {input: '1 / 1', response: 'divisionzz 1'},
        ];

        const promises = [];
        inputs.forEach(input => {
            const responsePromise = mind.process(input.input, locale, null);

            responsePromise.then((response: IHiveResponse) => {
                expect(response.response()).toBe(input.response);
            });

            promises.push(responsePromise);
        });

        return Promise.all(promises);
    });
});
