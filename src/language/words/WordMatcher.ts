export interface WordMatcher {

    matches(word: string, toMatchWith: string): boolean;
}