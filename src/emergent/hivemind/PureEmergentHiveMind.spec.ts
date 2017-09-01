import { BasicLocale } from '../../language/i18n/BasicLocale';
import { IHiveMind } from './HiveMind';
import { CoreHiveMindModule } from '../../modules/core/CoreHiveMindModule';
import { MathHiveMindModule } from '../../modules/math/MathHiveMindModule';
import { HiveMindGenericTest } from './HiveMindGenericTest.spec';
import { HiveMindBuilder } from './HiveMindBuilder';
import { IHiveMindNeuron } from './neurons/HiveMindNeurons';
import { SimpleResponse } from '../neurons/responses/SimpleResponse';
import { Silence } from '../neurons/responses/Silence';

describe('PureEmergentHiveMind', () => {

    let mind: IHiveMind;

    beforeEach(() => {
        mind = HiveMindBuilder.createEmpty()
            .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
            .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
            .withPureEmergence(true)
            .build();
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

    const mockNeuronAlways8: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('', [], 0.8));
        },
    };
    mockNeuronAlways8['id'] = 'always8';
    const mockNeuronAlways9: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('THE response', [], 0.9));
        },
    };
    mockNeuronAlways9['id'] = 'always9';
    const mockNeuronAlways1: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('', [], 0.1));
        },
    };
    mockNeuronAlways1['id'] = 'always1';
    const mockNeuronAlwaysSilence: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new Silence());
        },
    };
    mockNeuronAlwaysSilence['id'] = 'silence';
    const mockNeuronAlwaysSilence2: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new Silence());
        },
    };
    mockNeuronAlwaysSilence2['id'] = 'silence2';

    it('should be emergent', function () {
        const pureEmergent = HiveMindBuilder.createEmpty()
            .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
            .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
            .registerNeurons([
                mockNeuronAlwaysSilence,
                mockNeuronAlways1,
                mockNeuronAlwaysSilence2,
                mockNeuronAlways8,
                mockNeuronAlways9,
            ])
            .withPureEmergence(true)
            .build();

        const result = pureEmergent.process('anyting', new BasicLocale('nl', 'nl'), {});

        return result.then(response => {
            expect(response.single().response()).toBe('THE response');
            expect(response.response()).toBe('THE response');

            // 3 neurons had a response
            expect(response.responses().length).toBe(3);

            // most certain should be first
            expect(response.responses()[0].response()).toBe('THE response');
        })
    });
});
