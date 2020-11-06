import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import { TimeUtils } from '../utils/TimeUtils';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import styles from './TeamMatchupBoxComponent.module.css';

type TeamMatchupBoxComponentProps = {
  schedulePrediction: SchedulePrediction
}

export default ({ schedulePrediction }: TeamMatchupBoxComponentProps) => {
  const { visitingTeamName, visitingTeamEloWinExp, homeTeamName, homeTeamEloWinExp, game } = schedulePrediction;
  const isScheduled: boolean = game === null;
  const didVisitorWin: boolean = game ? (game.pointsScoredVisitorAmt > game.pointsScoredHomeAmt) : false;
  const didHomeWin: boolean = game ? (game.pointsScoredHomeAmt > game.pointsScoredVisitorAmt) : false;

  return (
    <div key={`teamMatchupBox-${schedulePrediction.scheduleId}`}>
      <table key={`teamMatchupBox-table-header-${schedulePrediction.scheduleId}`} className={styles['game-header']}>
        <thead>
          {renderTableHeader(isScheduled, schedulePrediction)}
        </thead>
      </table>
      <table key={`teamMatchupBox-table-contents-${schedulePrediction.scheduleId}`} className={styles['game-body']}>
        <tbody>
          {renderTableRowForTeam(visitingTeamName, visitingTeamEloWinExp, isScheduled, didVisitorWin, game?.pointsScoredVisitorAmt )}
          {renderTableRowForTeam(homeTeamName, homeTeamEloWinExp, isScheduled, didHomeWin, game?.pointsScoredHomeAmt )}
        </tbody>
      </table>
    </div>
  );
};

function renderTableHeader(
  isScheduled: boolean,
  schedulePrediction: SchedulePrediction,
): JSX.Element {
  const timeStr: string = TimeUtils.getPrintableTimeFromDate(schedulePrediction.date);
  const header: string = isScheduled ? timeStr : "FINAL";
  return (
    <tr className={styles['tr']}>
      <th className={styles['th']}>
        {header}
      </th>
    </tr>
  )
}

function renderTableRowForTeam(
  teamName: TeamName,
  winExp: number,
  isScheduled: boolean,
  didWin: boolean,
  pointsScored?: number
): JSX.Element {
  const winExpStr: string = `${(winExp * 100).toFixed(1)}%`;
  return (
    <tr className={`${styles['tr']} ${styles['game-team']}`}>
      <td className={`${styles['td']} ${styles['logo']}`}>
        <TeamLogoImageComponent teamName={teamName} height={24} />
      </td>
      <td className={`${styles['td']} ${styles['team']}`}>
        {TeamNameUtils.getPrintableNameFromTeamName(teamName)}
      </td>
      <td className={`${styles['td']} ${styles['win-exp']}`}>
        {winExpStr}
      </td>
      <td className={`${styles['td']} ${styles['score']} ${isScheduled ? styles['scheduled'] : styles['occurred']} ${didWin ? styles['winner'] : styles['loser']}`}>
        {pointsScored ?? "-"}
      </td>
    </tr>
  );
}