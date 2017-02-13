import {WordMatcher} from "./WordMatcher";

export class LevenshteinDistanceMatcher implements WordMatcher {

    public matches(word: string, toMatchWith: string): boolean {
        return this.levenshtein(
            word,
            toMatchWith,
            this.requiredDistance(toMatchWith));
    }

    private requiredDistance(toMatchWith: string) {
        return (toMatchWith.length / 4);
    }

    private levenshtein(word: string, toMatchWith: string, requiredDistance: number): boolean {
        const lengthOfWord = word ? word.length : 0;
        const lengthOfMatchCandidate = toMatchWith ? toMatchWith.length : 0;

        if (lengthOfWord === 0 || lengthOfMatchCandidate === 0) {
            return false;
        }

        const distance = this.calculateDistance(
            word.toLowerCase(),
            toMatchWith.toLowerCase(),
            lengthOfWord,

            lengthOfMatchCandidate);

        return distance <= requiredDistance;
    };

    private calculateDistance(word: string,
                              toMatchWith: string,
                              lengthOfWord: number,
                              lengthOfMatchCandidate: number): number {
        const matrix = new Array<number[]>(lengthOfMatchCandidate + 1);
        for (let i = 0; i <= lengthOfMatchCandidate; ++i) {
            let row = matrix[i] = new Array<number>(lengthOfWord + 1);
            row[0] = i;
        }
        const firstRow = matrix[0];
        for (let j = 1; j <= lengthOfWord; ++j) {
            firstRow[j] = j;
        }
        for (let i = 1; i <= lengthOfMatchCandidate; ++i) {
            for (let j = 1; j <= lengthOfWord; ++j) {
                if (toMatchWith.charAt(i - 1) === word.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1], // substitution
                            matrix[i][j - 1], // insertion
                            matrix[i - 1][j] // deletion
                        ) + 1;
                }
            }
        }
        return matrix[lengthOfMatchCandidate][lengthOfWord];
    }
}
