import {SimpleResponse} from '../emergent/neurons/responses/SimpleResponse';
import {GreetingNeuron} from './core/GreetingNeuron';
import {BasicRequestContext, RequestContext} from "../emergent/BasicRequestContext";
import {BasicLocale, Locale} from "../language/i18n/BasicLocale";
import {BasicUserInput} from "../emergent/BasicUserInput";
import { IHiveMindNeuron } from '../emergent/hivemind/neurons/HiveMindNeurons';

describe('General test methods', () => {
    it('should be able use general test methods', function () {
        const testMethods = GeneralTestMethods.create(new GreetingNeuron());

        return testMethods.expectInputToGiveResponse('hi', 'oratio.core.hello');
    });
});

export class GeneralTestMethods {
    private neuron: IHiveMindNeuron;
    private locale: Locale;
    private minimumCertainty: number;
    private context;

    constructor(neuron: IHiveMindNeuron, locale: Locale, certainty: number) {
        this.neuron = neuron;
        this.locale = locale;
        this.minimumCertainty = certainty;
        this.context = new BasicRequestContext(null, null, locale);
    }

    static create(neuron: IHiveMindNeuron): GeneralTestMethods {
        return new GeneralTestMethods(neuron, new BasicLocale('en', 'uk'), 0.75);
    }

    withLocale(locale: Locale): GeneralTestMethods {
        return new GeneralTestMethods(
            this.neuron,
            locale,
            this.minimumCertainty,
        );
    }

    withMinimumCertainty(certainty: number): GeneralTestMethods {
        return new GeneralTestMethods(this.neuron, this.locale, certainty);
    }

    expectInputToGiveResponse(input: string, response: string): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), this.context)
            .then(neuronResponse => {
                expect(neuronResponse.hasAnswer()).toBeTruthy();

                const simpleResponse = <SimpleResponse>neuronResponse;

                expect(simpleResponse.response).toBe(response);
                expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(
                    this.minimumCertainty,
                );
            });
    }

    expectInputAndContextToGiveResponse(input: string,
                                        context: RequestContext,
                                        response: string,): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), context)
            .then(neuronResponse => {
                expect(neuronResponse.hasAnswer()).toBeTruthy();

                const simpleResponse = neuronResponse as SimpleResponse;

                expect(simpleResponse.response).toBe(response);
                expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(
                    this.minimumCertainty,
                );
            });
    }

    expectInputAndContextToGiveResponseWithParam(input: string,
                                                 context: RequestContext,
                                                 response: string,
                                                 param: string,): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), context)
            .then(neuronResponse => {
                expect(neuronResponse.hasAnswer()).toBeTruthy();

                const simpleResponse = <SimpleResponse>neuronResponse;

                expect(simpleResponse.response).toBe(response);
                expect(simpleResponse.params.length).toBe(1);
                expect(simpleResponse.params[0]).toBe(param);
                expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(
                    this.minimumCertainty,
                );
            });
    }

    expectInputToGiveResponseAndHaveParam(input: string,
                                          response: string,): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), this.context)
            .then(neuronResponse => {
                expect(neuronResponse.hasAnswer()).toBeTruthy();

                const simpleResponse = <SimpleResponse>neuronResponse;

                expect(simpleResponse.response).toBe(response);
                expect(simpleResponse.params.length).toBe(1);
                expect(simpleResponse.params[0]).toBeDefined();
                expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(
                    this.minimumCertainty,
                );
            });
    }

    expectInputToGiveResponseAndParam(input: string,
                                      response: string,
                                      param: string,): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), this.context)
            .then(neuronResponse => {
                expect(neuronResponse.hasAnswer()).toBeTruthy();

                const simpleResponse = <SimpleResponse>neuronResponse;

                expect(simpleResponse.response).toBe(response);
                expect(simpleResponse.params.length).toBe(1);
                expect(simpleResponse.params[0]).toBe(param);
                expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(
                    this.minimumCertainty,
                );
            });
    }

    expectInputToGiveSilence(input: string): Promise<void> {
        return this.neuron
            .process(new BasicUserInput(input), this.context)
            .then(response => {
                expect(response.hasAnswer()).toBeFalsy();

                const simpleResponse = <SimpleResponse>response;

                expect(simpleResponse.response).toBe(undefined);
            });
    }
}
