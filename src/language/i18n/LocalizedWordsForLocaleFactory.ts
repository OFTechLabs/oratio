import { LocalizedWords } from './LocalizedWords';

export class LocalizedWordsForLocaleFactory {
    public static createMain(localizedWords: LocalizedWords,
                             locale: string,): string[] {
        return localizedWords[locale] !== undefined ? localizedWords[locale].main : [];
    }

    public static createParams(localizedWords: LocalizedWords,
                               locale: string,): string[] {
        return localizedWords[locale] !== undefined ? localizedWords[locale].params : [];

    }

    public static createContinuation(localizedWords: LocalizedWords,
                                     locale: string,): string[] {
        return localizedWords[locale] !== undefined ? localizedWords[locale].continuation : [];
    }
}
