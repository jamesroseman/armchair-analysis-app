import { Game } from "./GameTypes";
import { BettingOdds } from "./BettingOddsTypes";
import { TeamName, Day } from "./ModelConstantTypes";

export type SchedulePrediction = {
  scheduleId: string,
  gameId: string,
  game?: Game,
  bettingOdds?: BettingOdds,
  seasonYear: number,
  weekNumber: number,
  dayOfWeek: Day,
  date: string,
  visitingTeamName: TeamName,
  visitingTeamEloRating: number,
  visitingTeamEloRatingRank: number,
  visitingTeamEloWinExp: number,
  homeTeamName: TeamName,
  homeTeamEloRating: number,
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