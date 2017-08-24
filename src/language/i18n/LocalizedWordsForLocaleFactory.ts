import {LocalizedWords} from './LocalizedWords';
import {Locale} from "./BasicLocale";

export class LocalizedWordsForLocaleFactory {
    public static createMain(localizedWords: LocalizedWords,
                             locale: Locale,): string[] {
        const forLocale = localizedWords[locale.language()];
        return forLocale !== undefined ? forLocale.main : [];
    }

    public static createParams(localizedWords: LocalizedWords,
                               locale: Locale,): string[] {
        const forLocale = localizedWords[locale.language()];
        return forLocale !== undefined ? forLocale.params : [];

    }

    public static createContinuation(localizedWords: LocalizedWords,
                                     locale: Locale,): string[] {
        const forLocale = localizedWords[locale.language()];
        return forLocale !== undefined ? forLocale.continuation : [];
    }
}
