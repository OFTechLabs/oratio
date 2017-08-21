import { LocalizedWords } from './LocalizedWords';

export class LocalizedWordsForLocaleFactory {
    public static createMain(localizedWords: LocalizedWords,
                             locale: string,): string[] {
        const forLocale = localizedWords[locale];
        return forLocale !== undefined ? forLocale.main : [];
    }

    public static createParams(localizedWords: LocalizedWords,
                               locale: string,): string[] {
        const forLocale = localizedWords[locale];
        return forLocale !== undefined ? forLocale.params : [];

    }

    public static createContinuation(localizedWords: LocalizedWords,
                                     locale: string,): string[] {
        const forLocale = localizedWords[locale];
        return forLocale !== undefined ? forLocale.continuation : [];
    }
}
