export interface Locale {
    language(): string;

    region(): string;
}

export class BasicLocale implements Locale {


    constructor(private _language: string,
                private _region: string,) {
    }

    language(): string {
        return this._language;
    }

    region(): string {
        return this._region;
    }

}
