import { Surface } from "recharts";
import { Conditions, Day, TeamName } from "./ModelConstantTypes";

export type Game = {
  gameId: string,
  seasonYear: number,
  weekNumber: number,
  dayOfWeek: Day,
  visitingTeamName: TeamName,
  homeTeamName: TeamName,
  stadium: string,
  temperatureNo?: number,
  humidityNo?: number,
  windSpeedNo?: number,
  windDirection?: string,
  conditions?: Conditions,
  surface: Surface,
  overUnderNo: number,
  visitorPointSpreadNo: number,
  pointsScoredVisitorAmt: number,
  pointsScoredHomeAmt: number
}