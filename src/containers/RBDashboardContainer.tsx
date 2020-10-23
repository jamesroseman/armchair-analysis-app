import React from 'react';
import { Player } from '../types/PlayerDashboardTypes';
import GameStatsTableComponent from '../components/StatsTableComponent';

type PlayerDashboardContainerProps = {
  player: Player
}

export default ({ player }: PlayerDashboardContainerProps) => {
  const headlineStatsTableData = formatGamesForHeadlineStatsTable(player);

  console.log(player);

  return (
    <div>
      <GameStatsTableComponent headers={headlineStatsTableData.headers} rows={headlineStatsTableData.rows} />
    </div>
  )
}

function formatGamesForHeadlineStatsTable({ playerGames }: Player) {
  const avgFantasyPoints = playerGames.reduce((a, g) => a + g.fantasyPoints, 0) / playerGames.length;
  const positiveFantasyDeviationsCt = playerGames.reduce((a, g) => g.fantasyPoints >= avgFantasyPoints ? a + 1 : a, 0);
  const negativeFantasyDeviationsCt = playerGames.reduce((a, g) => g.fantasyPoints < avgFantasyPoints ? a + 1 : a, 0);
  const minFantasyScored = playerGames.reduce((a, g) => g.fantasyPoints < a ? g.fantasyPoints : a, Number.MAX_SAFE_INTEGER);
  const maxFantasyScored = playerGames.reduce((a, g) => g.fantasyPoints > a ? g.fantasyPoints : a, 0);

  const deviations = playerGames.map((g) => Math.abs(avgFantasyPoints - g.fantasyPoints));
  const avgDeviationPerGame = deviations.reduce((a, deviation) => a + deviation, 0) / playerGames.length;

  const headers = [
    "Games",
    "Avg. Fantasy",
    "(+) Deviation",
    "(-) Deviation",
    "Consistency",
    "Avg. Deviation",
    "Min",
    "Max"
  ];
  const rows = [
    [
      playerGames.length,
      avgFantasyPoints.toFixed(2),
      positiveFantasyDeviationsCt,
      negativeFantasyDeviationsCt,
      Math.abs((0.5 - (negativeFantasyDeviationsCt / playerGames.length)) * 100).toFixed(2),
      avgDeviationPerGame.toFixed(3),
      minFantasyScored,
      maxFantasyScored
    ],
  ];
  return { headers, rows };
}
