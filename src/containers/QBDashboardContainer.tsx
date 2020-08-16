import React from 'react';
import { Player } from '../types/PlayerDashboardTypes';
import QBPerformanceLineChartComponent from '../components/QBPerformanceLineChartComponent';
import QBHeadlineStatsComponent from '../components/QBHeadlineStatsComponent';
import { aggregateQuarterbackGameData } from '../transformers/PlayerDashboardDataTransformers';
import QBGameStatsTableComponent from '../components/QBGameStatsTableComponent';

type PlayerDashboardContainerProps = {
  player: Player
}

export default ({ player }: PlayerDashboardContainerProps) => {
  const { demographicData, playerGames } = player;
  const { firstName, lastName, primaryPosition } = demographicData;
  return (
    <div>
      <h1>{firstName} {lastName} {primaryPosition} Dashboard</h1>
      <QBPerformanceLineChartComponent data={playerGames} />
      <QBHeadlineStatsComponent aggregation={aggregateQuarterbackGameData(playerGames)} />
      <QBGameStatsTableComponent games={playerGames} />
    </div>
  )
}
