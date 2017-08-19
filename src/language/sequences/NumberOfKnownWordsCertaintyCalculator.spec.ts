import 'jest';
import {NumberOfKnownWordsCertaintyCalculator} from './NumberOfKnownWordsCertaintyCalculator';

describe('Number of known words certainty calculator', () => {
    it('should be able to determine certainty', function () {
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(2, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(0.5);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(1, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(0.25);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(3, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(0.75);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(4, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(1);

        expect(
            NumberOfKnownWordsCertaintyCalculator.calculateForSquence(
                ['', '', '', ''],
                ['a', 'b', 'c', 'd'],
            ),
        ).toBe(1);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculateForSquence(
                ['', ''],
                ['a', 'b', 'c', 'd'],
            ),
        ).toBe(0.5);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculateForSquence(
                [],
                ['a', 'b', 'c', 'd'],
            ),
        ).toBe(0);
    });

    it('should never be larger than 1', function () {
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(6, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(1);
        expect(
            NumberOfKnownWordsCertaintyCalculator.calculate(100, [
                'a',
                'b',
                'c',
                'd',
            ]),
        ).toBe(1);

        expect(
            NumberOfKnownWordsCertaintyCalculator.calculateForSquence(
                [' ', 'b'],
                ['a'],
            ),
        ).toBe(1);
    });
});
