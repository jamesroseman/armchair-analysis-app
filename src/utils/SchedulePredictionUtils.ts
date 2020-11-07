import { SchedulePrediction, SchedulePredictionsAccuracy } from "../types/SchedulePredictionTypes";

export type DateToSchedulePredictionsMap = {
  [date: string]: SchedulePrediction[]
}

export type WeekNumberToSchedulePredictionsMap = {
  [weekNumber: string]: SchedulePrediction[]
}

export class SchedulePredictionUtils {

  /**
   * Determine whether or not a predicted game has occurred.
   */
  public static hasPredictionOccurred(
    schedulePrediction: SchedulePrediction
  ): boolean {
    return schedulePrediction.game !== null && typeof(schedulePrediction.game) !== "undefined";
  }

  /**
   * Determine whether or not a prediction was accurate.
   */
  public static isPredictionCorrect(
    schedulePrediction: SchedulePrediction,
  ): boolean {
    if (schedulePrediction.game === null || typeof(schedulePrediction.game) === "undefined") {
      return false;
    }
    const { game, visitingTeamEloWinExp, homeTeamEloWinExp } = schedulePrediction;
    const { pointsScoredVisitorAmt, pointsScoredHomeAmt } = game;
    const didVisitorWin: boolean = pointsScoredVisitorAmt > pointsScoredHomeAmt;
    const didHomeWin: boolean = pointsScoredHomeAmt > pointsScoredVisitorAmt;
    const didPredictVisitorWin: boolean = visitingTeamEloWinExp > 0.50;
    const didPredictHomeWin: boolean = homeTeamEloWinExp > 0.50;
    return (didVisitorWin && didPredictVisitorWin) || (didHomeWin && didPredictHomeWin);
  }

  /**
   * Determine whether or not a prediction can be considered "confident" based
   * on a win expectation limit.
   * @param confidenceLimit The win expectation limit at which a prediction is considered "confident". (0-1)
   */
  public static isPredictionConfident(
    schedulePrediction: SchedulePrediction,
    confidenceLimit: number
  ): boolean {
    const { visitingTeamEloWinExp, homeTeamEloWinExp } = schedulePrediction;
    return visitingTeamEloWinExp >= confidenceLimit || homeTeamEloWinExp >= confidenceLimit;
  }

  /**
   * Determine whether or not a prediction is the opposite of the betting line of that
   * game. Can only be computed retroactively, so scheduled games are always false.
   */
  public static isPredictionAgainstTheSpread(
    schedulePrediction: SchedulePrediction
  ): boolean {
    const { visitingTeamEloWinExp, homeTeamEloWinExp, game } = schedulePrediction;
    if (game === null || typeof(game) === "undefined") {
      return false;
    }
    const { visitorPointSpreadNo } = game;
    const didPredictVisitingWin: boolean = visitingTeamEloWinExp > 0.5;
    const didPredictHomeWin: boolean = homeTeamEloWinExp > 0.5;
    // A negative point spread indicates the team was favored to win.
    return (visitorPointSpreadNo < 0 && didPredictHomeWin) || (visitorPointSpreadNo > 0 && didPredictVisitingWin);
  }

  /**
   * Compute the accuracy over a series of SchedulePredictions.
   * @param confidenceLimit The win expectation limit at which a prediction is considered "confident". (0-1)
   */
  public static getAccuracyFromSchedulePredictions(
    schedulePredictions: SchedulePrediction[],
    confidenceLimit: number
  ): SchedulePredictionsAccuracy {
    const accuracy: SchedulePredictionsAccuracy = schedulePredictions.reduce(
      (agg: SchedulePredictionsAccuracy, schedulePrediction: SchedulePrediction) => {
        if (schedulePrediction.game !== null && typeof(schedulePrediction.game) !== "undefined") {
          const didPredictCorrectly: boolean = SchedulePredictionUtils.isPredictionCorrect(schedulePrediction);
          const isConfidentPrediction: boolean = SchedulePredictionUtils.isPredictionConfident(schedulePrediction, confidenceLimit);
          const isAgainstTheSpreadPrediction: boolean = SchedulePredictionUtils.isPredictionAgainstTheSpread(schedulePrediction);

          // Add the counts
          agg.predictionsAmt += 1;
          if (didPredictCorrectly) {
            agg.correctPredictionsAmt += 1;
          }
          if (isConfidentPrediction) {
            agg.confidentPredictionsAmt += 1;
          }
          if (didPredictCorrectly && isConfidentPrediction) {
            agg.correctConfidentPredictionsAmt += 1;
          }
          if (isAgainstTheSpreadPrediction) {
            agg.againstTheSpreadPredictionsAmt += 1;
          }
          if (isAgainstTheSpreadPrediction && didPredictCorrectly) {
            agg.correctAgainstTheSpreadPredictionsAmt += 1;
          }
        }
        return agg;
      },
      {
        predictionsAmt: 0,
        correctPredictionsAmt: 0,
        confidentPredictionsAmt: 0,
        correctConfidentPredictionsAmt: 0,
        againstTheSpreadPredictionsAmt: 0,
        correctAgainstTheSpreadPredictionsAmt: 0
      } as SchedulePredictionsAccuracy
    );
    const { 
      predictionsAmt, 
      correctPredictionsAmt,
      confidentPredictionsAmt, 
      correctConfidentPredictionsAmt,
      againstTheSpreadPredictionsAmt,
      correctAgainstTheSpreadPredictionsAmt
    } = accuracy;
    accuracy.predictionsGuessRate = correctPredictionsAmt / (predictionsAmt > 0 ? predictionsAmt : 1);
    accuracy.confidentPredictionsGuessRate = correctConfidentPredictionsAmt / (confidentPredictionsAmt > 0 ? confidentPredictionsAmt : 1);
    accuracy.againstTheSpreadPredictionsGuessRate = correctAgainstTheSpreadPredictionsAmt / (againstTheSpreadPredictionsAmt > 0 ? againstTheSpreadPredictionsAmt : 1);
    return accuracy;
  }

  /**
   * Group SchedulePredictions by their date-strings (without time).
   */
  public static getDateToSchedulePredictionsMap(
    schedulePredictions: SchedulePrediction[]
  ): DateToSchedulePredictionsMap {
    return schedulePredictions.reduce(
      (agg: DateToSchedulePredictionsMap, sp: SchedulePrediction) => {
        const trimmedDate: string = sp.date.split(' ')[0];
        if (!agg.hasOwnProperty(trimmedDate)) {
          agg[trimmedDate] = [];
        }
        return {
          ...agg,
          [trimmedDate]: [ ...agg[trimmedDate], sp ],
        }
      },
      {}
    );
  }

  /**
   * Group SchedulePredictions by their week numbers.
   */
  public static getWeekNumberToSchedulePredictionsMap(
    schedulePredictions: SchedulePrediction[]
  ): WeekNumberToSchedulePredictionsMap {
    return schedulePredictions.reduce(
      (agg: WeekNumberToSchedulePredictionsMap, sp: SchedulePrediction) => {
        if (!agg.hasOwnProperty(sp.weekNumber)) {
          agg[sp.weekNumber] = [];
        }
        return {
          ...agg,
          [sp.weekNumber]: [ ...agg[sp.weekNumber], sp ],
        }
      },
      {}
    );
  }

}