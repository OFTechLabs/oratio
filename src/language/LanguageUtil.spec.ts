import "jest";
import { LanguageUtil } from "./LanguageUtil";

describe("language util", () => {
  it("should be able to determine if object is defined", function() {
    expect(LanguageUtil.isDefined(null)).toBe(false);
    expect(LanguageUtil.isDefined(undefined)).toBe(false);
    expect(LanguageUtil.isDefined({})).toBe(true);
    expect(LanguageUtil.isDefined(false)).toBe(true);
    expect(LanguageUtil.isDefined("")).toBe(true);
  });

  it("should be able to determine if it is a word", function() {
    expect(LanguageUtil.isWord(null)).toBe(false);
    expect(LanguageUtil.isWord(undefined)).toBe(false);
    expect(LanguageUtil.isWord("")).toBe(false);
    expect(LanguageUtil.isWord("h")).toBe(true);
    expect(LanguageUtil.isWord("hello")).toBe(true);
  });

  it("should be able to determine if it is a sequence", function() {
    expect(LanguageUtil.isSequence(null)).toBe(false);
    expect(LanguageUtil.isSequence(undefined)).toBe(false);
    expect(LanguageUtil.isSequence([])).toBe(false);
    expect(LanguageUtil.isSequence(["h"])).toBe(true);
    expect(LanguageUtil.isSequence(["hello", "hi"])).toBe(true);
  });
});
