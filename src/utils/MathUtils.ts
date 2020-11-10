export class MathUtils {

  /**
   * Calculates the sum
   */
  public static sum(
    values: number[],
  ): number {
    return values.reduce(
      (acc: number, value: number) => acc + value,
      0
    );
  }

  /**
   * Calculates the mean
   */
  public static mean(
    values: number[],
  ): number {
    if (values.length === 0) {
      return 0;
    }
    const sum: number = MathUtils.sum(values);
    return sum / values.length;
  }

  /**
   * Calculates the standard deviation of a value set.
   * Treats value set as population, rather than sample.
   */
  // https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data/variance-standard-deviation-population/a/calculating-standard-deviation-step-by-step
  public static stddev(
    values: number[],
  ): number {
    if (values.length === 0) {
      return 0;
    }
    const mean: number = MathUtils.mean(values);
    const distances: number[] = values.map((value: number) => {
      return Math.pow(value - mean, 2);
    });
    const distancesSum: number = MathUtils.sum(distances);
    return Math.sqrt(distancesSum / values.length);
  }

  /**
   * Generates all possible subsets of an array.
   * @param values Values to generate powerset for.
   */
  //https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript
  public static getPowerset<T>(
    values: T[],
    shouldIgnoreLengthRestriction: boolean = false
  ): T[][] {
    if (values.length > 20 && !shouldIgnoreLengthRestriction) {
      throw Error("Will run out of memory processing too large a value-set.");
    }
    let result: T[][] = [];
    result.push([]);

    for (let i=1; i<(1 << values.length); i++) {
      let subset: T[] = [];
      for (let j=0; j<values.length; j++) {
        if (i & (1 << j)) {
          subset.push(values[j]);
        }
        result.push(subset);
      }
    }

    return Array.from(new Set(result));
  }
}