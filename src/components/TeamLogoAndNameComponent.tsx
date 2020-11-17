import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import styles from './TeamLogoAndNameComponent.module.css';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import { TeamRecord } from '../types/TeamTypes';

type TeamLogoAndNameComponentProps = {
  teamName: TeamName,
  record?: TeamRecord
}

export default ({ teamName, record }: TeamLogoAndNameComponentProps) => {

  const teamNameStr: string = TeamNameUtils.getLongNameFromTeamName(teamName);
  const teamRecordStr: string = record !== null && typeof(record) !== "undefined"
  ? (
    record.ties > 0
    ? `(${record.wins}-${record.losses}-${record.ties})`
    : `(${record.wins}-${record.losses})`
  ): "";

  return (
    <div className={styles['root']}>
      <div className={styles['image']}>
        <TeamLogoImageComponent teamName={teamName} height={50} width={50} />
      </div>
      <div className={styles['team-name']}>{teamNameStr}</div>
      <div className={styles['team-record']}>{teamRecordStr}</div>
    </div>
  );
};