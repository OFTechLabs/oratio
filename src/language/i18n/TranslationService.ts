const placeholderRegExp: RegExp = /\{[^}]*}/g;

export class TranslationService {

    public static translate(translations: { [key: string]: string },
                            key: string,
                            params?: string[]): string {
        if (translations[key]) {
            const value: string = translations[key];
            if (params !== undefined) {
                return this.replaceParameters(value, params);
            }
            return value;
        }
        return key;
    }

    private static replaceParameters(value: string, params: string[]): string {
        return value.replace(placeholderRegExp, (placeholder: string) => {
            const key: number = Number.parseInt(placeholder.slice(1, -1));
            return key in params ? params[key] : placeholder;
        });
    }
}
