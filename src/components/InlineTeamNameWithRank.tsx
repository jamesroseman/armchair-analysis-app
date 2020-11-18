import React, { FunctionComponent } from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import styles from './InlineTeamNameWithRank.module.css';

export type InlineTeamNameWithRankProps = {
  teamName: TeamName,
  rank: number
}

const InlineTeamNameWithRank: FunctionComponent<InlineTeamNameWithRankProps> = ({ teamName, rank }) => {
  const printableTeamName: string = TeamNameUtils.getShortNameFromTeamName(teamName);
  const printableRank: string = `#${rank}`;
  return (
    <div className={styles['team-name-with-rank']}>
      <div className={styles['team-name']}>{printableTeamName}</div>
      <div className={styles['rank']}>{printableRank}</div>
    </div>
  );
}

export default InlineTeamNameWithRank;