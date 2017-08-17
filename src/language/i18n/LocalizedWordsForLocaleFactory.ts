import { LocalizedWords } from './LocalizedWords';

export class LocalizedWordsForLocaleFactory {
    public static createMain(
        localizedWords: LocalizedWords,
        locale: string,
    ): { words: string[] } {
        const words = localizedWords.main[locale];

        return words !== undefined ? words : { words: [] };
    }

    public static createParams(
        localizedWords: LocalizedWords,
        locale: string,
    ): { words: string[] } {
        const words = localizedWords.params[locale];

        return words !== undefined ? words : { words: [] };
    }

    public static createContinuation(
        localizedWords: LocalizedWords,
        locale: string,
    ): { words: string[] } {
        const words = localizedWords.continuation[locale];

        return words !== undefined ? words : { words: [] };
    }
}
