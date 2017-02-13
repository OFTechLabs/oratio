import "jest";
import {HiveMind, BasicHiveMind} from "./HiveMind";
import {BasicHiveMindNeurons} from "./HiveMindNeurons";
import {IdentityNeuron} from "./modules/core/IdentityNeuron";
require("babel-core/register");
require("babel-polyfill");

describe("HiveMind", () => {

    let mind : HiveMind;

    beforeEach(function () {
        const neurons = new BasicHiveMindNeurons([
            new IdentityNeuron()
        ]);

        mind = new BasicHiveMind(neurons);
    });

    it("should process neurons correctly", function () {
        const input = "who are you";

        const response = mind.process(input, null);

        expect(response.response()).toBe("oratio.identity")
    });

};

