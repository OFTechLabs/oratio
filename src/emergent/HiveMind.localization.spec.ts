import 'jest';
import {IHiveMind} from './HiveMind';
import {HiveMindBuilder} from './HiveMindBuilder';
import {IHiveResponse} from './HiveResponse';
import {CoreHiveMindModule} from '../modules/core/CoreHiveMindModule';
import {MathHiveMindModule} from '../modules/math/MathHiveMindModule';

var chai = require('chai');

describe('HiveMind localization', () => {
    let mind: IHiveMind;
    const locale: string = 'en';

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE.withTranslations(
                {
                    'oratio.core.currentTime': 'The current time is:',
                    'oratio.core.identity': 'I am Oratio',
                    'oratio.core.hello': 'Hello to you!'
                }
            ))
            .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
            .build();
    });

    it('should translate to configured translations', function () {
        const inputs: { input: string; response: string }[] = [
            {input: 'who are you', response: 'I am Oratio'},
            {input: 'what time is it', response: 'The current time is:'},
            {input: 'hello', response: 'Hello to you!'},
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
