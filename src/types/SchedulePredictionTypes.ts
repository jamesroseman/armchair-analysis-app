import { TeamName } from "./ModelConstantTypes";

export type SchedulePrediction = {
  scheduleId: string,
  gameId: string,
  weekNumber: number,
  seasonYear: number,
  homeTeamName: TeamName,
  homeTeamEloRating: number,
  homeTeamEloRatingRank: number,
  homeTeamEloWinExp: number,
  visitingTeamName: TeamName,
  visitingTeamEloRating: number,
  visitingTeamEloRatingRank: number,
  visitingTeamEloWinExp: number,
}