import { MathUtils } from "../MathUtils";

describe("MathUtils", () => {
  describe("getStdDev", () => {
    test("gets empty std dev correctly", () => {
      const testInput: number[] = [];
      const expectedStdDev: number = 0;
      const stdDev: number = MathUtils.stddev(testInput);
      expect(stdDev).toBe(expectedStdDev);
    });

    test("gets constant std dev correctly", () => {
      const testInput: number[] = [1, 1, 1, 1];
      const expectedStdDev: number = 0;
      const stdDev: number = MathUtils.stddev(testInput);
      expect(stdDev).toBe(expectedStdDev);
    });

    test("gets std dev correctly", () => {
      const testInput: number[] = [1, 1, 1, 1, 10];
      const expectedStdDev: number = 3.6;
      const stdDev: number = MathUtils.stddev(testInput);
      expect(stdDev).toBe(expectedStdDev);
    });
  })

  describe("getPowerset", () => {
    test("gets empty powerset", () => {
      const testInput: number[] = [];
      const expectedPowerset: number[][] = [[]];
      const powerset: number[][] = MathUtils.getPowerset<number>(testInput);
      expect(powerset).toStrictEqual(expectedPowerset);
    });

    test("gets powerset of one", () => {
      const testInput: number[] = [1];
      const expectedPowerset: number[][] = [[], [1]];
      const powerset: number[][] = MathUtils.getPowerset<number>(testInput);
      expect(powerset).toStrictEqual(expectedPowerset);
    });

    test("gets powerset of two", () => {
      const testInput: number[] = [1, 2];
      const expectedPowerset: number[][] = [
        [],
        [1],
        [2],
        [1, 2]
      ];
      const powerset: number[][] = MathUtils.getPowerset<number>(testInput);
      expect(powerset).toStrictEqual(expectedPowerset);
    });

    test("gets large powerset", () => {
      const testInput: number[] = [1, 2, 3, 4];
      const expectedPowerset: number[][] = [
        [], 
        [1],
        [2],
        [1, 2],
        [3],
        [1, 3],
        [2, 3],
        [1, 2, 3],
        [4],
        [1, 4],
        [2, 4],
        [1, 2, 4],
        [3, 4],
        [1, 3, 4],
        [2, 3, 4],
        [1, 2, 3, 4]
      ];
      const powerset: number[][] = MathUtils.getPowerset<number>(testInput);
      expect(powerset).toStrictEqual(expectedPowerset);
    });

    test("handles very large powerset", () => {
      const size: number = 1000000;
      const testInput: number[] = Array(size).fill(0).map((_: number, i: number) => i);
      expect(() => MathUtils.getPowerset<number>(testInput, true)).not.toThrow();
    });
  });
});