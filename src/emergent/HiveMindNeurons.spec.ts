import {BasicHiveMindNeurons} from "./HiveMindNeurons";
import {GreetingNeuron} from "../modules/core/GreetingNeuron";
import {TimeNeuron} from "../modules/core/TimeNeuron";
import {MathJSNeuron} from "../modules/mathjs/MathJSNeuron";
import {SimpleResponse} from "./neurons/responses/SimpleResponse";

describe("BasicHiveMindNeurons", () => {

    let neurons: BasicHiveMindNeurons;
    const locale: string = "en";
    let greetingNeuron = new GreetingNeuron();
    let timeNeuron = new TimeNeuron();
    let mathjsNeuron = new MathJSNeuron();

    beforeEach(() => {
        neurons = new BasicHiveMindNeurons(
            [
                greetingNeuron,
                timeNeuron,
                mathjsNeuron,
            ],
            0.75
        );
    });

    it("should detect fired neuron", function () {
        return neurons.findMatch("What is the current time?".split(" "), locale, null).then(response => {
            expect((<SimpleResponse> response.getResponse()).response).toBe("oratio.core.currentTime");
            expect(response.getFiredNeuron()).toBe(timeNeuron);
        });
    });

    it("should place fired neuron to the top", function () {
        return neurons.findMatch("What is the current time?".split(" "), locale, null).then(response => {
            expect((<SimpleResponse> response.getResponse()).response).toBe("oratio.core.currentTime");
            expect(neurons["neurons"][0]).toBe(timeNeuron);
        });
    });

});
