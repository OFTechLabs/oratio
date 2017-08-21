import {BasicHiveMindNeurons} from './HiveMindNeurons';
import {GreetingNeuron} from '../modules/core/GreetingNeuron';
import {TimeNeuron} from '../modules/core/TimeNeuron';
import {SimpleResponse} from './neurons/responses/SimpleResponse';
import {RequestContext} from './RequestContext';

describe('BasicHiveMindNeurons', () => {
    let neurons: BasicHiveMindNeurons;
    const locale: string = 'en';
    let greetingNeuron = new GreetingNeuron();
    let timeNeuron = new TimeNeuron();

    beforeEach(() => {
        neurons = new BasicHiveMindNeurons(
            [greetingNeuron, timeNeuron],
            0.75,
        );
    });

    it('should detect fired neuron', function () {
        return neurons
            .findMatch(
                'What is the current time?'.split(' '),
                locale,
                new RequestContext(null, null),
            )
            .then(response => {
                expect((<SimpleResponse>response.getResponse()).response).toBe(
                    'oratio.core.currentTime',
                );
                expect(response.getFiredNeuron()).toBe(timeNeuron);
                return neurons.findMatch(
                    ['hello'],
                    locale,
                    new RequestContext(null, null),
                );
            })
            .then(response => {
                expect((<SimpleResponse>response.getResponse()).response).toBe(
                    'oratio.core.hello',
                );
                expect(response.getFiredNeuron()).toBe(greetingNeuron);
            });
    });

    it('should place fired neuron to the top', function () {
        return neurons
            .findMatch(
                'What is the current time?'.split(' '),
                locale,
                new RequestContext(null, null),
            )
            .then(response => {
                expect((<SimpleResponse>response.getResponse()).response).toBe(
                    'oratio.core.currentTime',
                );
                expect(neurons['neurons'][0]).toBe(timeNeuron);
            });
    });
});
