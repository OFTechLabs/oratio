import "jest";
import { SequenceParser } from "./SequenceParser";

describe("Sequence Parser", () => {
  it("should be able to parse sequences", function() {
    const sequence = [
      "hello",
      "this is the zodiac speaking",
      "hell freezes over"
    ];
    const sequences = SequenceParser.parse(sequence);

    expect(sequences.sequences.length).toBe(3);
    expect(sequences.singleWord.length).toBe(1);
    expect(sequences.twoWords.length).toBe(0);
    expect(sequences.threeWords.length).toBe(1);
    expect(sequences.fourWords.length).toBe(0);

    var index = 0;
    sequences.sequences.forEach(createdSequence => {
      expect(createdSequence.length).toBe(sequence[index].split(" ").length);
      expect(createdSequence.sequence).toBe(sequence[index]);
      expect(createdSequence.withoutSpaces).toBe(
        sequence[index].replace(" ", "")
      );
      index++;
    });
  });

  it("should be able to handle empty sequences", function() {
    const values = [null, undefined, []];

    values.forEach(value => {
      const sequences = SequenceParser.parse(value);
      expect(sequences.sequences.length).toBe(0);
      expect(sequences.fourWords.length).toBe(0);
      expect(sequences.threeWords.length).toBe(0);
      expect(sequences.twoWords.length).toBe(0);
      expect(sequences.singleWord.length).toBe(0);
    });
  });
});
