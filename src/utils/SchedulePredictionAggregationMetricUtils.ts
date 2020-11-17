import { SchedulePredictionAggregationMetric } from "../types/SchedulePredictionAggregationMetricTypes";
import { TeamRecord } from "../types/TeamTypes";

export class SchedulePredictionAggregationMetricUtils {
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