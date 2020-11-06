import React from 'react';
import TeamMatchupBoxComponent from '../components/TeamMatchupBoxComponent';
import { Day } from '../types/ModelConstantTypes';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { TimeUtils } from '../utils/TimeUtils';
import styles from './AllSchedulePredictionsContainer.module.css';

type AllSchedulePredictionsProps = {
  schedulePredictions: SchedulePrediction[],
}

type DateToSchedulePredictionsMap = {
  [date: string]: SchedulePrediction[]
}

type WeekNumberToSchedulePredictionsMap = {
  [weekNumber: string]: SchedulePrediction[]
}

export default ({ schedulePredictions }: AllSchedulePredictionsProps) => {
  const weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap = getWeekNumberToSchedulePredictionsMap(schedulePredictions);
  const weekNumbers: string[] = Object.keys(weekNumberToSchedulePredictionsMap).reverse();

  return (
    <div>
      {renderMatchupsForWeeks(weekNumbers, weekNumberToSchedulePredictionsMap)}
    </div>
  );
}

function renderMatchupsForWeeks(weekNumbers: string[], weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap): JSX.Element[] {
  return weekNumbers.map((weekNumber: string) => {
    const schedulePredictions: SchedulePrediction[] = weekNumberToSchedulePredictionsMap[weekNumber];
    const dateToSchedulePredictionsMap: DateToSchedulePredictionsMap = getDateToSchedulePredictionsMap(schedulePredictions);
    const dates: string[] = Object.keys(dateToSchedulePredictionsMap);
    return (
      <div key={`matchups-for-weeks-${Math.random()}`}>
        <div className={styles['week-number']}>Week {weekNumber}</div>
        {renderMatchupsForWeek(dates, dateToSchedulePredictionsMap)}
      </div>
    );
  });
}

function renderMatchupsForWeek(dates: string[], dateToSchedulePredictionsMap: DateToSchedulePredictionsMap): JSX.Element[] {
  return dates.map((date: string) => {
    const dayOfWeek: Day = dateToSchedulePredictionsMap[date][0].dayOfWeek;
    const printableDate: string = TimeUtils.getPrintableDateFromDateAndDayOfWeek(date, dayOfWeek);
    return (
      <div key={date}>
        <div className={styles['date']}>{printableDate}</div>
        <div className={styles['week-matchups']}>
          {dateToSchedulePredictionsMap[date].map(renderSchedulePredictionRow)}
        </div>
      </div>
    );
  });
}

function renderSchedulePredictionRow(schedulePrediction: SchedulePrediction): JSX.Element {
  return(
    <div key={`matchupbox-${schedulePrediction.scheduleId}`} className={styles['matchup-box']}>
      <TeamMatchupBoxComponent schedulePrediction={schedulePrediction} />
    </div>
  );
}

function getWeekNumberToSchedulePredictionsMap(schedulePredictions: SchedulePrediction[]): WeekNumberToSchedulePredictionsMap {
  return schedulePredictions.reduce(
    (agg: WeekNumberToSchedulePredictionsMap, sp: SchedulePrediction) => {
      if (!agg.hasOwnProperty(sp.weekNumber)) {
        agg[sp.weekNumber] = [];
      }
      return {
        ...agg,
        [sp.weekNumber]: [ ...agg[sp.weekNumber], sp ],
      }
    },
    {}
  );
}

function getDateToSchedulePredictionsMap(schedulePredictions: SchedulePrediction[]): DateToSchedulePredictionsMap {
  return schedulePredictions.reduce(
    (agg: DateToSchedulePredictionsMap, sp: SchedulePrediction) => {
      const trimmedDate: string = sp.date.split(' ')[0];
      if (!agg.hasOwnProperty(trimmedDate)) {
        agg[trimmedDate] = [];
      }
      return {
        ...agg,
        [trimmedDate]: [ ...agg[trimmedDate], sp ],
      }
    },
    {}
  );
}