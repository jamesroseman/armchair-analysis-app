import React from 'react';
import TeamLogoImageComponent from '../components/TeamLogoImageComponent';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import styles from './AllSchedulePredictionsContainer.module.css';

type AllSchedulePredictionsProps = {
  schedulePredictions: SchedulePrediction[],
}

type WeekNumberToSchedulePredictions = {
  [weekNumber: string]: SchedulePrediction[]
}

export default ({ schedulePredictions }: AllSchedulePredictionsProps) => {
  const weekNumberToSchedulePredictions: WeekNumberToSchedulePredictions = schedulePredictions.reduce(
    (agg: WeekNumberToSchedulePredictions, sp: SchedulePrediction) => {
      if (!agg.hasOwnProperty(sp.weekNumber)) {
        agg[sp.weekNumber] = [];
      }
      agg[sp.weekNumber] = [...agg[sp.weekNumber], sp];
      return agg;
    },
    {}
  );
  const reversedWeekNumbers: string[] = Object.keys(weekNumberToSchedulePredictions).reverse();
  return (
    <div>
      {renderTables(reversedWeekNumbers, weekNumberToSchedulePredictions)}
    </div>
  );
}

function renderTables(reversedWeekNumbers: string[], weekNumberToSchedulePredictions: WeekNumberToSchedulePredictions): JSX.Element[] {
  return reversedWeekNumbers.map((weekNumber: string) => {
    return (
      <div>
        {renderWeekNumberHeader(weekNumber)}
        <table className={styles.table}>
          {weekNumberToSchedulePredictions[weekNumber].map(renderSchedulePredictionRow)}
        </table>
      </div>
    );
  });
}

function renderWeekNumberHeader(weekNumber: string): JSX.Element {
  return <div className={styles.weekNumberHeader}>Week {weekNumber}</div>;
}

function renderSchedulePredictionRow(schedulePrediction: SchedulePrediction): JSX.Element {
  const {
    visitingTeamName,
    visitingTeamEloRatingRank,
    visitingTeamEloWinExp,
    homeTeamName,
    homeTeamEloRatingRank,
  } = schedulePrediction;
  return(
    <tr>
      <td>
        <TeamLogoImageComponent width={25} teamName={visitingTeamName} />
      </td>
      <td>
        #{visitingTeamEloRatingRank}
      </td>
      <td>
        {visitingTeamName}
      </td>
      <td>
      <td>
        {(visitingTeamEloWinExp * 100).toFixed(1)}%
      </td>
      </td>
      <td>
        #{homeTeamEloRatingRank}
      </td>
      <td>
        {homeTeamName}
      </td>
      <td>
      <TeamLogoImageComponent width={25} teamName={homeTeamName} />
      </td>
    </tr>
  );
}