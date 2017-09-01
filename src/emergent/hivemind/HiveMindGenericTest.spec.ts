import { IHiveMind } from './HiveMind';
import { BasicLocale, Locale } from '../../language/i18n/BasicLocale';
import { IHiveResponse } from './HiveResponse';

const chai = require('chai');

describe('HiveMindGenericTest', () => {
    it('dummy..', function () {
        expect(true).toBeTruthy();
    });
});

export class HiveMindGenericTest {

    private static locale: Locale = new BasicLocale('en', 'uk');

    public static testForInputWithResponse(mind: IHiveMind, inputs) {
        return HiveMindGenericTest.testForInputWithLocale(mind, inputs, HiveMindGenericTest.locale);
    }

    public static testForInputWithLocale(mind: IHiveMind, inputs, locale: Locale) {
        const promises = [];
        inputs.forEach(input => {
            const responsePromise = mind.process(input.input, locale, null);

            responsePromise.then((response: IHiveResponse) => {
                expect(response.response()).toBe(input.response);
            });

            promises.push(responsePromise);
        });

        return promises;
    }

    public static testConversation(mind: IHiveMind, inputs, locale: Locale) {
        let index = 0;
        return new Promise(async resolve => {
            while (index < inputs.length) {
                await mind.process(inputs[index].input, locale, null)
                    .then((response: IHiveResponse) => {
                        chai.assert(
                            response.response() === inputs[index].response,
                            '[' +
                            index +
                            '] expect input ' +
                            inputs[index].input +
                            ' to give ' +
                            inputs[index].response,
                        );
                        index++;
                        return {};
                    });
            }
            resolve({});
        });

    }
}
