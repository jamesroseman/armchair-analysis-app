import React, { useState } from 'react';
import { Player, PlayerPosition, SeasonSelection } from '../types/PlayerDashboardTypes';
import QBDashboardContainer from '../containers/QBDashboardContainer';
import RBDashboardContainer from '../containers/RBDashboardContainer';
import styles from './PlayerDashboardContainer.module.css';
import SeasonSelector from '../components/SeasonSelectorComponent';
import PerformanceLineChartComponent from '../components/PerformanceLineChartComponent';
import { Collapse } from 'reactstrap';

type PlayerDashboardProps = {
  player: Player
}

const ONE_SEASON = [2019];
const THREE_SEASONS = [2019, 2018, 2017];

export default ({ player }: PlayerDashboardProps) => {
  const [playerState, setPlayerState] = useState<Player>(player);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(true);

  const { firstName, lastName, primaryPosition } = player.demographicData;
  const oneSeasonGames = player.playerGames.filter((game) => ONE_SEASON.includes(game.seasonYear));
  const threeSeasonGames = player.playerGames.filter((game) => THREE_SEASONS.includes(game.seasonYear));
  const selectionGameMap = {
    [SeasonSelection.One]: oneSeasonGames,
    [SeasonSelection.Three]: threeSeasonGames,
    [SeasonSelection.Lifetime]: player.playerGames
  };

  const onStateChange = ((selection: SeasonSelection) => {
    setPlayerState({
      ...playerState,
      playerGames: selectionGameMap[selection]
    } as Player);
  })

  return (
    <div>
      <div className={styles.header}>
        <h1>{firstName} {lastName} {primaryPosition} Dashboard</h1>
        <SeasonSelector onStateChange={onStateChange} />
      </div>
      <div>
        <div className={styles.generalStatsHeader} onClick={() => setIsStatsOpen(!isStatsOpen)}>
          General Stats
        </div>
        <hr />
        <Collapse isOpen={isStatsOpen}>
          <PerformanceLineChartComponent data={formatGamesForPerfLineChart(playerState).data} lines={formatGamesForPerfLineChart(playerState).lines} />
          <RBDashboardContainer player={playerState} />
          </Collapse>
      </div>
      {renderDashboard(playerState)}
    </div>
  )
}

function renderDashboard(player: Player) {
  const { primaryPosition } = player.demographicData;
  if (primaryPosition === PlayerPosition.Quarterback) {
    return <QBDashboardContainer player={player} />
  }
}


function formatGamesForPerfLineChart({ playerGames }: Player) {
  const avgFantasyPoints = playerGames.reduce((a, g) => a + g.fantasyPoints, 0) / playerGames.length;
  const data = playerGames.map((game) => ({
    fantasyPoints: game.fantasyPoints,
    avgFantasyPoints
  }))
  const dataWithFantasyAvg = data.map((datapoint) => ({
    ...datapoint,
    avgFantasyPoints
  }))
  const lines = [
    {
      dataKey: "fantasyPoints",
      color: "green"
    },
    {
      dataKey: "avgFantasyPoints",
      color: "orange"
    }
  ];
  return { data: dataWithFantasyAvg, lines }
}
