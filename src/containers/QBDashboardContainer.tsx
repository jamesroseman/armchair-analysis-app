import React from 'react';
import { Player } from '../types/PlayerDashboardTypes';
import { aggregateQuarterbackGameData } from '../transformers/PlayerDashboardDataTransformers';
import GameStatsTableComponent from '../components/StatsTableComponent';
import { QuarterbackGame, QuarterbackDataAggregation } from '../types/QBDashboardTypes';

type PlayerDashboardContainerProps = {
  player: Player
}

export default ({ player }: PlayerDashboardContainerProps) => {
  const headlineStatsTableData = formatGamesForHeadlineStatsTable(player);
  const allGamesTableData = formatGamesForAllGamesTable(player);

  return (
    <div>
      <GameStatsTableComponent headers={headlineStatsTableData.headers} rows={headlineStatsTableData.rows} />
      <GameStatsTableComponent headers={allGamesTableData.headers} rows={allGamesTableData.rows} />
    </div>
  )
}

function formatGamesForAllGamesTable({ playerGames }: Player) {
  const headers = [
    "Game ID",
    "Season",
    "Touchdowns",
    "Attempts",
    "Completions",
    "Percentage",
    "Fantasy"
  ];
  const rows = playerGames.map((game: QuarterbackGame) => [
    game.gameId,
    game.seasonYear,
    game.passingTouchdownsAmt,
    game.passingAttemptsAmt,
    game.passingCompletionsAmt,
    `${(100 * game.passingCompletionsAmt / game.passingAttemptsAmt).toFixed(2)}%`,
    game.fantasyPoints
  ]);
  return { headers, rows };
}

function formatGamesForHeadlineStatsTable({ playerGames }: Player) {
  const agg: QuarterbackDataAggregation = aggregateQuarterbackGameData(playerGames);
  const headers = [
    "Agg",
    "Games",
    "Touchdowns",
    "Attempts",
    "Yardage",
    "Completions",
    "Percentage",
    "Fantasy",
    "Deviation"
  ];
  const rows = [
    [
      "Avg",
      agg.gamesAmt,
      agg.avgPassingTouchdownsAmt.toFixed(3),
      agg.avgPassingAttemptsAmt.toFixed(3),
      agg.avgPassingYardageAmt.toFixed(3),
      agg.avgPassingCompletionsAmt.toFixed(3),
      `${(100 * agg.avgPassingCompletionPctg).toFixed(1)}%`,
      agg.avgFantasyPoints.toFixed(1),
      agg.avgFantasyPointsDev.toFixed(1)
    ],
    [
      "Max",
      agg.gamesAmt,
      agg.maxPassingTouchdownsAmt,
      agg.maxPassingAttemptsAmt,
      agg.maxPassingYardageAmt,
      agg.maxPassingCompletionsAmt,
      `${(100 * agg.maxPassingCompletionPctg).toFixed(1)}%`,
      agg.maxFantasyPoints,
      agg.maxFantasyPointsDev
    ],
    [
      "Min",
      agg.gamesAmt,
      agg.minPassingTouchdownsAmt,
      agg.minPassingAttemptsAmt,
      agg.minPassingYardageAmt,
      agg.minPassingCompletionsAmt,
      `${(100 * agg.minPassingCompletionPctg).toFixed(1)}%`,
      agg.minFantasyPoints,
      agg.minFantasyPointsDev
    ]
  ];
  return { headers, rows };
}
