import { QuarterbackGame } from "./QBDashboardTypes";

export enum PlayerPosition {
  Quarterback = "QB",
  Runningback = "RB",
  WideReceiver = "WR"
}

export type Player = {
  demographicData: {
    playerAbbr: string,
    firstName: string,
    lastName: string,
    primaryPosition: PlayerPosition
  };
  playerGames: QuarterbackGame[];
}

export enum SeasonSelection {
  One = "one_season",
  Three = "three_season",
  Lifetime = "lifetime"
}
