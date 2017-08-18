import {TranslationService} from "./TranslationService";

describe('Translation service', () => {

    let translations: {[key: string]: string} = {};

    beforeEach(function () {
        translations['oratio.greeting'] = 'Hello!';
        translations['oratio.error'] = 'Error!';
        translations['oratio.unknown'] = 'I did not understand...';
        translations['oratio.withParameters'] = 'A {0} B {1} C {0} D {0} E {1} F {2}';
    });

    it('should be able to translate', function () {
        expect(TranslationService.translate(translations, 'oratio.greeting')).toBe('Hello!');
        expect(TranslationService.translate(translations, 'oratio.error')).toBe('Error!');
        expect(TranslationService.translate(translations, 'oratio.unknown')).toBe('I did not understand...');
    });

    it('should be able to translate with parameters', function () {
        expect(TranslationService.translate(translations, 'oratio.greeting')).toBe('Hello!');
        expect(TranslationService.translate(translations, 'oratio.error')).toBe('Error!');
        expect(TranslationService.translate(translations, 'oratio.unknown')).toBe('I did not understand...');
    });

    it('should be able to translate with parameters', function () {
        expect(TranslationService.translate(translations, 'oratio.withParameters', ['X', 'Y', 'Z']))
            .toBe('A X B Y C X D X E Y F Z');
    });

    it('should keep key if translation is unknown', function () {
        expect(TranslationService.translate(translations, 'app.specific.key'))
            .toBe('app.specific.key');
        expect(TranslationService.translate(translations, 'oratio.specific.key'))
            .toBe('oratio.specific.key');
    });

    it('should keep param entries if there are no params (they might be filled in by the application)', function () {
        expect(TranslationService.translate(translations, 'oratio.withParameters'))
            .toBe('A {0} B {1} C {0} D {0} E {1} F {2}');
    });

});
