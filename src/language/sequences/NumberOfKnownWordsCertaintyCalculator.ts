export class NumberOfKnownWordsCertaintyCalculator {
    public static calculate(numberOfKnownWords: number,
                            input: string[],): number {
        if (input.length > 0) {
            return numberOfKnownWords / input.length > 1
                ? 1
                : numberOfKnownWords / input.length;
        }

        return 0;
    }

    public static calculateForSquence(sequence: string[],
                                      input: string[],): number {
        return NumberOfKnownWordsCertaintyCalculator.calculate(
            sequence.length,
            input,
        );
    }
}
