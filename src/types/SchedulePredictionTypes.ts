import { Game } from "./GameTypes";
import { BettingOdds } from "./BettingOddsTypes";
import { TeamName, Day } from "./ModelConstantTypes";
import { SchedulePredictionAggregationMetric } from "./SchedulePredictionAggregationMetricTypes";

export type SchedulePrediction = {
  scheduleId: string,
  gameId: string,
  game?: Game,
  bettingOdds?: BettingOdds,
  metrics?: SchedulePredictionAggregationMetric[],
  seasonYear: number,
  weekNumber: number,
  dayOfWeek: Day,
  date: string,
  visitingTeamName: TeamName,
  visitingTeamEloRatingRank: number,
  visitingTeamEloWinExp: number,
  homeTeamName: TeamName,
  homeTeamEloRatingRank: number,
  homeTeamEloWinExp: number,
}

export type SchedulePredictionsAccuracy = {
  predictionsAmt: number,
  correctPredictionsAmt: number,
  predictionsGuessRate: number,
  confidentPredictionsAmt: number,
  correctConfidentPredictionsAmt: number,
  confidentPredictionsGuessRate: number,
  againstTheSpreadPredictionsAmt: number,
  correctAgainstTheSpreadPredictionsAmt: number,
  againstTheSpreadPredictionsGuessRate: number
}