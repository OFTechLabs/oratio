export class LocalizedWords {
    public main: { [language: string]: { words: string[] } | undefined };
    public params: { [language: string]: { words: string[] } | undefined };
    public continuation: {
        [language: string]: { words: string[] } | undefined;
    };
}
