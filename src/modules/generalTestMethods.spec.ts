import {IHiveMindNeuron} from "../emergent/HiveMindNeurons";
import {SimpleResponse} from "../emergent/neurons/responses/SimpleResponse";
import {GreetingNeuron} from "./core/GreetingNeuron";
import {HiveMindContext} from "../emergent/HiveMindContext";
import {HiveMindInputNode} from "../emergent/HiveMindInputNode";

describe("General test methids", () => {

    it("should be able use general test methods", function () {
        const testMethods = GeneralTestMethods.create(new GreetingNeuron());

        return testMethods.expectInputToGiveResponse("hi", "oratio.core.hello");
    });

});

export class GeneralTestMethods {

    private neuron: IHiveMindNeuron;
    private locale: string;
    private minimumCertainty: number;
    private emptyContext = new HiveMindContext(null, null)

    constructor(neuron: IHiveMindNeuron, locale: string, certainty: number) {
        this.neuron = neuron;
        this.locale = locale;
        this.minimumCertainty = certainty;
    }

    static create(neuron: IHiveMindNeuron): GeneralTestMethods {
        return new GeneralTestMethods(
            neuron,
            "en",
            0.75,
        );
    }

    withLocale(locale: string): GeneralTestMethods {
        return new GeneralTestMethods(
            this.neuron,
            locale,
            this.minimumCertainty,
        );
    }

    withMinimumCertainty(certainty: number): GeneralTestMethods {
        return new GeneralTestMethods(
            this.neuron,
            this.locale,
            certainty,
        );
    }

    expectInputToGiveResponse(input: string,
                              response: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, this.emptyContext).then(neuronResponse => {
            expect(neuronResponse.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> neuronResponse;

            expect(simpleResponse.response).toBe(response);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(this.minimumCertainty);
        })
    }

    expectInputAndContextToGiveResponse(input: string,
                                        context: HiveMindContext,
                                        response: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, context).then(neuronResponse => {
            expect(neuronResponse.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> neuronResponse;

            expect(simpleResponse.response).toBe(response);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(this.minimumCertainty);
        })
    }

    expectInputAndContextToGiveResponseWithParam(input: string,
                                                 context: HiveMindContext,
                                                 response: string,
                                                 param: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, context).then(neuronResponse => {
            expect(neuronResponse.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> neuronResponse;

            expect(simpleResponse.response).toBe(response);
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe(param);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(this.minimumCertainty);
        })
    }

    expectInputToGiveResponseAndHaveParam(input: string,
                                          response: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, this.emptyContext).then(neuronResponse => {
            expect(neuronResponse.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> neuronResponse;

            expect(simpleResponse.response).toBe(response);
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBeDefined();
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(this.minimumCertainty);
        })
    }

    expectInputToGiveResponseAndParam(input: string,
                                      response: string,
                                      param: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, this.emptyContext).then(neuronResponse => {
            expect(neuronResponse.hasAnswer()).toBeTruthy();

            const simpleResponse = <SimpleResponse> neuronResponse;

            expect(simpleResponse.response).toBe(response);
            expect(simpleResponse.params.length).toBe(1);
            expect(simpleResponse.params[0]).toBe(param);
            expect(simpleResponse.getCertainty()).toBeGreaterThanOrEqual(this.minimumCertainty);
        })
    }

    expectInputToGiveSilence(input: string): Promise<void> {
        return this.neuron.process(input.split(" "), this.locale, this.emptyContext).then(response => {
            expect(response.hasAnswer()).toBeFalsy();

            const simpleResponse = <SimpleResponse> response;

            expect(simpleResponse.response).toBe(undefined);
        })
    }

}


