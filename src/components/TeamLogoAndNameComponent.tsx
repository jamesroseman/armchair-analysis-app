import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import styles from './TeamLogoAndNameComponent.module.css';
import { TeamNameUtils } from '../utils/TeamNameUtils';

type TeamLogoAndNameComponentProps = {
  teamName: TeamName,
}

export default ({ teamName }: TeamLogoAndNameComponentProps) => {

  const teamNameStr: string = TeamNameUtils.getLongNameFromTeamName(teamName);

  return (
    <div className={styles['root']}>
      <div className={styles['image']}>
      <TeamLogoImageComponent teamName={teamName} height={50} width={50} />
      </div>
      <div className={styles['team-name']}>{teamNameStr}</div>
    </div>
  );
};