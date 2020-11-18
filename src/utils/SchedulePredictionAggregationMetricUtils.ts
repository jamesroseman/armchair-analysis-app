import { SchedulePredictionAggregationMetric } from "../types/SchedulePredictionAggregationMetricTypes";
import { TeamRecord } from "../types/TeamTypes";

export class SchedulePredictionAggregationMetricUtils {
  /**
   * A metric is considered "uneven" when one team is in the top-5 
   * and the other is in the bottom-5 allowed of that metric
   */
  public static isMetricUneven(metric: SchedulePredictionAggregationMetric): boolean {
    const { 
      homeTeamMetricRank,
      visitingTeamMetricRank,
      allowedHomeTeamMetricRank,
      allowedVisitingTeamMetricRank
    } = metric;
    const isHomeUneven: boolean = homeTeamMetricRank <= 5 && (allowedVisitingTeamMetricRank ?? 1) >= 27;
    const isVisitingUneven: boolean = visitingTeamMetricRank <= 5 && (allowedHomeTeamMetricRank ?? 1) >= 27;
    return isHomeUneven || isVisitingUneven;
  }

  /**
   * A metric is considered "significant" when one team is ranked very high or very low
   */
  public static isMetricSignificant(
    metric: SchedulePredictionAggregationMetric,
    threshold: number = 3
  ): boolean {
    const { 
      homeTeamMetricRank,
      visitingTeamMetricRank,
      allowedHomeTeamMetricRank,
      allowedVisitingTeamMetricRank
    } = metric;
    const highPass: number = Math.min(threshold, 1);
    const lowPass: number = Math.max((32 - threshold), 32);
    const isHomeSignificant: boolean = homeTeamMetricRank <= highPass || (allowedVisitingTeamMetricRank ?? 1) >= lowPass;
    const isVisitingSignificant: boolean = visitingTeamMetricRank <= highPass && (allowedHomeTeamMetricRank ?? 1) >= lowPass;
    return isHomeSignificant || isVisitingSignificant;
  }

  /**
   * Helper method to get home TeamRecord from metrics.
   */
  public static getHomeRecordFromMetrics(
    metrics: SchedulePredictionAggregationMetric[]
  ): TeamRecord | undefined {
    const hasWins: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Wins").length > 0;
    const hasLosses: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Losses").length > 0;
    const hasTies: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Ties").length > 0;
    if (hasWins && hasLosses && hasTies) {
      const wins: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Wins")[0].homeTeamMetricAmt;
      const losses: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Losses")[0].homeTeamMetricAmt;
      const ties: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Ties")[0].homeTeamMetricAmt;
      return {
        wins,
        losses,
        ties
      } as TeamRecord;
    }
    return;
  }

  /**
   * Helper method to get home TeamRecord from metrics.
   */
  public static getVisitingRecordFromMetrics(
    metrics: SchedulePredictionAggregationMetric[]
  ): TeamRecord | undefined {
    const hasWins: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Wins").length > 0;
    const hasLosses: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Losses").length > 0;
    const hasTies: boolean = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Ties").length > 0;
    if (hasWins && hasLosses && hasTies) {
      const wins: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Wins")[0].visitingTeamMetricAmt;
      const losses: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Losses")[0].visitingTeamMetricAmt;
      const ties: number = metrics.filter((m: SchedulePredictionAggregationMetric) => m.metricName === "Ties")[0].visitingTeamMetricAmt;
      return {
        wins,
        losses,
        ties
      } as TeamRecord;
    }
    return;
  }
}