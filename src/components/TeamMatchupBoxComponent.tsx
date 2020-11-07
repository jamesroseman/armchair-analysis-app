import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { SchedulePredictionUtils } from '../utils/SchedulePredictionUtils';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import { TimeUtils } from '../utils/TimeUtils';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import styles from './TeamMatchupBoxComponent.module.css';

type TeamMatchupBoxComponentProps = {
  schedulePrediction: SchedulePrediction,
  shouldHighlight?: boolean,
  isCorrect?: boolean,
  hasOccurred?: boolean
}

export default ({ schedulePrediction, shouldHighlight, isCorrect, hasOccurred }: TeamMatchupBoxComponentProps) => {
  const { visitingTeamName, visitingTeamEloWinExp, homeTeamName, homeTeamEloWinExp, game } = schedulePrediction;
  const isScheduled: boolean = !SchedulePredictionUtils.hasPredictionOccurred(schedulePrediction);
  const didVisitorWin: boolean = game ? (game.pointsScoredVisitorAmt > game.pointsScoredHomeAmt) : false;
  const didHomeWin: boolean = game ? (game.pointsScoredHomeAmt > game.pointsScoredVisitorAmt) : false;

  // Only display the point spread for the favored team (the team with a negative point spread).
  let visitorPointSpreadNo: number | undefined = undefined;
  let homePointSpreadNo: number | undefined = undefined;
  if (game !== null && typeof(game) !== "undefined") {
    visitorPointSpreadNo = game.visitorPointSpreadNo < 0
    ? game.visitorPointSpreadNo
    : undefined;
    homePointSpreadNo = game.visitorPointSpreadNo > 0
    ? game.visitorPointSpreadNo * -1
    : undefined;
  }

  let cardClassNames: string = styles['game-body'];
  if (isCorrect && hasOccurred) {
    cardClassNames += ` ${styles['correct']}`;
  } else if (isCorrect !== null && hasOccurred) {
    cardClassNames += ` ${styles['incorrect']}`;
  }
  if (shouldHighlight) {
    cardClassNames += ` ${styles['highlight']}`;
  }

  return (
    <div key={`teamMatchupBox-${schedulePrediction.scheduleId}`}>
      <table key={`teamMatchupBox-table-header-${schedulePrediction.scheduleId}`} className={styles['game-header']}>
        <thead>
          {renderTableHeader(isScheduled, schedulePrediction)}
        </thead>
      </table>
      <table key={`teamMatchupBox-table-contents-${schedulePrediction.scheduleId}`} className={cardClassNames}>
        <tbody>
          {renderTableRowForTeam(visitingTeamName, visitingTeamEloWinExp, isScheduled, didVisitorWin, visitorPointSpreadNo, game?.pointsScoredVisitorAmt )}
          {renderTableRowForTeam(homeTeamName, homeTeamEloWinExp, isScheduled, didHomeWin, homePointSpreadNo, game?.pointsScoredHomeAmt )}
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
  pointSpread?: number,
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
      <td className={`${styles['td']} ${styles['point-spread']}`}>
        {pointSpread ?? ""}
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