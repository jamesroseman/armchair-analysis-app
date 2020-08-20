import React from 'react';
import { Player, PlayerPosition } from '../types/PlayerDashboardTypes';
import QBDashboardContainer from '../containers/QBDashboardContainer';
import styles from './PlayerDashboardContainer.module.css';

type PlayerDashboardProps = {
  player: Player
}

export default ({ player }: PlayerDashboardProps) => {
  const { firstName, lastName, primaryPosition } = player.demographicData;

  return (
    <div>
      <h1 className={styles.title}>{firstName} {lastName} {primaryPosition} Dashboard</h1>
      {renderDashboard(player)}
    </div>
  )
}

function renderDashboard(player: Player) {
  if (player.demographicData.primaryPosition === PlayerPosition.Quarterback) {
    return <QBDashboardContainer player={player} />
  }
}
