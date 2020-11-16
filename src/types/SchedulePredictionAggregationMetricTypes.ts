export type SchedulePredictionAggregationMetric = {
  schedulePredictionId: string,
  metricName: string,
  homeTeamMetricRank: number,
  homeTeamMetricAmt: number,
  homeTeamMetricAvg: number,
  visitingTeamMetricRank: number,
  visitingTeamMetricAmt: number,
  visitingTeamMetricAvg: number,
  // If the metric has an "allowed" complement
  allowedMetricName?: string,
  allowedHomeTeamMetricRank?: number,
  allowedHomeTeamMetricAmt?: number,
  allowedHomeTeamMetricAvg?: number,
  allowedVisitingTeamMetricRank?: number,
  allowedVisitingTeamMetricAmt?: number,
  allowedVisitingTeamMetricAvg?: number,
}