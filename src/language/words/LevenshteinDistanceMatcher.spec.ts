'use strict';

import 'jest';
import {LevenshteinDistanceMatcher} from './LevenshteinDistanceMatcher';

describe('Levenshtein distance matcher', () => {
    it('should correctly detect the same words', () => {
        const wordOne: string = 'one';
        const wordTwo: string = 'one';

        const matcher = new LevenshteinDistanceMatcher();

        expect(matcher.matches(wordOne, wordTwo)).toBeTruthy();
    });

    it('should not be case sensitive', () => {
        const wordOne: string = 'one';
        const wordTwo: string = 'ONE';

        const matcher = new LevenshteinDistanceMatcher();

        expect(matcher.matches(wordOne, wordTwo)).toBeTruthy();
    });

    it('should match even if there are small typo´s', () => {
        const words: { one: string; two: string }[] = [
            {one: 'shouldmatch', two: 'shoulmdatch'},
            {one: 'shouldmatchlarger', two: 'shoulmdathclarger'},
        ];

        const matcher = new LevenshteinDistanceMatcher();

        words.forEach(wordPair => {
            expect(matcher.matches(wordPair.one, wordPair.two)).toBeTruthy();
        });
    });

    it('should not match even if there are too many typo´s', () => {
        const words: { one: string; two: string }[] = [
            {one: 'one', two: 'oen'}, // words this small should just not contain any typś
            {one: 'shouldnotmatch', two: 'sohudltnomacth'},
            {one: 'shouldnotmatchlarger', two: 'sohudlnutmctchlaffer'},
        ];

        const matcher = new LevenshteinDistanceMatcher();

        words.forEach(wordPair => {
            expect(matcher.matches(wordPair.one, wordPair.two)).toBeFalsy();
        });
    });
});
