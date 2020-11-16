import { gql } from "apollo-boost";
import { SchedulePrediction } from "../types/SchedulePredictionTypes";

export type GetSchedulePredictionQueryResponse = {
  loading: boolean;
  data: {
    schedulePrediction: SchedulePrediction,
  }
}

export const GetSchedulePredictionQuery = gql`
  query GetSchedulePrediction($scheduleId: String!) {
    schedulePrediction(scheduleId: $scheduleId) {
      scheduleId,
      weekNumber,
      seasonYear,
      dayOfWeek,
      date,
      homeTeamName,
      visitingTeamName,
      metrics {
        metricName
        homeTeamMetricRank
        homeTeamMetricAmt
        homeTeamMetricAvg
        visitingTeamMetricRank
        visitingTeamMetricAmt
        visitingTeamMetricAvg
        
        allowedMetricName
        allowedHomeTeamMetricRank
        allowedHomeTeamMetricAmt
        allowedHomeTeamMetricAvg
        allowedVisitingTeamMetricRank
        allowedVisitingTeamMetricAmt
        allowedVisitingTeamMetricAvg
      }
    },
  },
`;