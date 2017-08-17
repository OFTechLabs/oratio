import 'jest';
import { IHiveMind } from './HiveMind';
import { HiveMindBuilder } from './HiveMindBuilder';
import { IHiveResponse } from './HiveResponse';

var chai = require('chai');

describe('HiveMind', () => {
    let mind: IHiveMind;
    const locale: string = 'en';

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerCoreModules()
            .registerMathModules()
            .registerMathJsModules()
            .build();
    });

    it('should process neurons correctly', function() {
        const inputs: { input: string; response: string }[] = [
            { input: 'who are you', response: 'oratio.core.identity' },
            { input: 'what time is it', response: 'oratio.core.currentTime' },
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

    it('should be able to have a conversation', function() {
        const inputs: { input: string; response: string }[] = [
            { input: 'wie ben je', response: 'oratio.core.identity' },
            { input: 'hoe laat is het', response: 'oratio.core.currentTime' },
            { input: 'en nu', response: 'oratio.core.currentTime' },
            { input: 'hallo', response: 'oratio.core.hello' },
            { input: '2 + 3', response: 'oratio.math.addition' },
            {
                input: 'bereken: (4 + 3) / 2',
                response: 'oratio.mathjs.evaluated',
            },
            { input: '9 * 3', response: 'oratio.math.multiplication' },
            { input: 'hallo', response: 'oratio.core.hello' },
            { input: 'hoe laat is het', response: 'oratio.core.currentTime' },
            {
                input: 'bereken: (4 + 3) + 4',
                response: 'oratio.mathjs.evaluated',
            },
            { input: '2 + 3', response: 'oratio.math.addition' },
        ];

        return mind
            .process(inputs[0].input, 'nl', null)
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[0].response,
                    '[' +
                        0 +
                        '] expect input ' +
                        inputs[0].input +
                        ' to give ' +
                        inputs[0].response,
                );
                return mind.process(inputs[1].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[1].response,
                    '[' +
                        1 +
                        '] expect input ' +
                        inputs[1].input +
                        ' to give ' +
                        inputs[1].response,
                );
                return mind.process(inputs[2].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[2].response,
                    '[' +
                        2 +
                        '] expect input ' +
                        inputs[2].input +
                        ' to give ' +
                        inputs[2].response,
                );
                return mind.process(inputs[3].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[3].response,
                    '[' +
                        3 +
                        '] expect input ' +
                        inputs[3].input +
                        ' to give ' +
                        inputs[3].response,
                );
                return mind.process(inputs[4].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[4].response,
                    '[' +
                        4 +
                        '] expect input ' +
                        inputs[4].input +
                        ' to give ' +
                        inputs[4].response,
                );
                return mind.process(inputs[5].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[5].response,
                    '[' +
                        5 +
                        '] expect input ' +
                        inputs[5].input +
                        ' to give ' +
                        inputs[5].response,
                );
                return mind.process(inputs[6].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[6].response,
                    '[' +
                        6 +
                        '] expect input ' +
                        inputs[6].input +
                        ' to give ' +
                        inputs[6].response,
                );
                return mind.process(inputs[7].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[7].response,
                    '[' +
                        7 +
                        '] expect input ' +
                        inputs[7].input +
                        ' to give ' +
                        inputs[7].response,
                );
                return mind.process(inputs[8].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[8].response,
                    '[' +
                        8 +
                        '] expect input ' +
                        inputs[8].input +
                        ' to give ' +
                        inputs[8].response,
                );
                return mind.process(inputs[9].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[9].response,
                    '[' +
                        9 +
                        '] expect input ' +
                        inputs[9].input +
                        ' to give ' +
                        inputs[9].response,
                );
                return mind.process(inputs[10].input, 'nl', null);
            })
            .then((response: IHiveResponse) => {
                chai.assert(
                    response.response() === inputs[10].response,
                    '[' +
                        10 +
                        '] expect input ' +
                        inputs[10].input +
                        ' to give ' +
                        inputs[10].response,
                );
            });
    });
});
