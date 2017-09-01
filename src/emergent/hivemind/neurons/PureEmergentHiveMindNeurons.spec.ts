import { BasicUserInput, UserInput } from '../../BasicUserInput';
import { BasicRequestContext, RequestContext } from '../../BasicRequestContext';
import { BasicLocale } from '../../../language/i18n/BasicLocale';
import { SimpleResponse } from '../../neurons/responses/SimpleResponse';
import { PureEmergentHiveMindNeurons } from './PureEmergentHiveMindNeurons';
import { Silence } from '../../neurons/responses/Silence';
import { IHiveMindNeuron } from './HiveMindNeurons';
import { TimeNeuron } from '../../../modules/core/TimeNeuron';
import { GreetingNeuron } from '../../../modules/core/GreetingNeuron';

describe('PureEmergentHiveMindNeurons', () => {

    let neurons: PureEmergentHiveMindNeurons;
    const locale: string = 'en';
    const timeNeuron = new TimeNeuron();
    const greetingNeuron = new GreetingNeuron();

    beforeEach(() => {
        neurons = new PureEmergentHiveMindNeurons(
            [
                timeNeuron,
                greetingNeuron,
            ],
        );
    });

    it('should detect fired neuron', function () {
        return neurons
            .findMatch(
                new BasicUserInput('What is the current time?'),
                new BasicRequestContext(null, null, new BasicLocale('en', 'us')),
            )
            .then(response => {
                expect((<SimpleResponse>response.getMostCertainResponse().getResponse()).response).toBe(
                    'oratio.core.currentTime',
                );
                expect(response.getMostCertainResponse().getFiredNeuron()).toBe(timeNeuron);
                return neurons.findMatch(
                    new BasicUserInput('hello'),
                    new BasicRequestContext(null, null, new BasicLocale('en', 'us')),
                );
            })
            .then(response => {
                expect((<SimpleResponse>response.getMostCertainResponse().getResponse()).response).toBe(
                    'oratio.core.hello',
                );
                expect(response.getMostCertainResponse().getFiredNeuron()).toBe(greetingNeuron);
            });
    });

    it('should place fired neuron to the top', function () {
        return neurons
            .findMatch(
                new BasicUserInput('What is the current time?'),
                new BasicRequestContext(null, null, new BasicLocale('en', 'us')),
            )
            .then(response => {
                expect((<SimpleResponse>response.getMostCertainResponse().getResponse()).response).toBe(
                    'oratio.core.currentTime',
                );
                expect(neurons['neurons'][0]).toBe(timeNeuron);
            });
    });

    const mockNeuronAlways8: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('', [], 0.8));
        },
    }
    mockNeuronAlways8['id'] = 'always8';
    const mockNeuronAlways9: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('THE response', [], 0.9));
        },
    }
    mockNeuronAlways9['id'] = 'always9';
    const mockNeuronAlways1: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new SimpleResponse('', [], 0.1));
        },
    }
    mockNeuronAlways1['id'] = 'always1';
    const mockNeuronAlwaysSilence: IHiveMindNeuron = {
        process: (input, request) => {
            return Promise.resolve(new Silence());
        },
    };
    mockNeuronAlwaysSilence['id'] = 'silence';
    const mockNeuronAlwaysSilence2: IHiveMindNeuron = {
        process: (input: UserInput, request: RequestContext) => {
            return Promise.resolve(new Silence());
        },
    };
    mockNeuronAlwaysSilence2['id'] = 'silence2';

    it('should be emergent and properly adjust neurons', function () {
        const pureEmergentNeurons = new PureEmergentHiveMindNeurons(
            [
                mockNeuronAlwaysSilence,
                mockNeuronAlways1,
                mockNeuronAlwaysSilence2,
                mockNeuronAlways8,
                mockNeuronAlways9
            ]
        );

        return pureEmergentNeurons.findMatch(
            new BasicUserInput('What is the current time?'),
            new BasicRequestContext(null, null, new BasicLocale('en', 'us')),
        ).then(response => {
            expect(response.getResponses().length).toBe(3);
            expect(response.getMostCertainResponse().getFiredNeuron()).toBe(mockNeuronAlways9);
            expect((response.getMostCertainResponse().getResponse()as SimpleResponse).response).toBe('THE response');

            expect(pureEmergentNeurons['neurons'].length).toBe(5);
            expect(pureEmergentNeurons['neurons'][0]).toBe(mockNeuronAlways9);
            expect(pureEmergentNeurons['neurons'][1]).toBe(mockNeuronAlways8);
            expect(pureEmergentNeurons['neurons'][2]).toBe(mockNeuronAlways1);
        })
    });
});
