export class LanguageUtil {

    public static isDefined(object: any): boolean {
        return object !== undefined && object !== null;
    }

    public static isWord(characters: string): boolean {
        return LanguageUtil.isDefined(characters) && characters.length > 0;
    }

    public static isSequence(sequence: string[]): boolean {
        return LanguageUtil.isDefined(sequence) && sequence.length > 0;
    }
}
