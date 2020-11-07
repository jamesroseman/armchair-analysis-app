import React, { useState } from 'react';
import PredictionAccuracyResultsComponent from '../components/PredictionAccuracyResultsComponent';
import TeamMatchupBoxComponent from '../components/TeamMatchupBoxComponent';
import { Day } from '../types/ModelConstantTypes';
import { SchedulePrediction, SchedulePredictionsAccuracy } from '../types/SchedulePredictionTypes';
import { DateToSchedulePredictionsMap, SchedulePredictionUtils, WeekNumberToSchedulePredictionsMap } from '../utils/SchedulePredictionUtils';
import { TimeUtils } from '../utils/TimeUtils';
import styles from './AllSchedulePredictionsContainer.module.css';

type AllSchedulePredictionsProps = {
  schedulePredictions: SchedulePrediction[],
}

const DEFAULT_CONFIDENCE_LIMIT: number = 59.3;

export default ({ schedulePredictions }: AllSchedulePredictionsProps) => {
  if (schedulePredictions.length === 0) { 
    return <div>No schedule predictions were found.</div> 
  }

  const [confidenceLimit, setConfidenceLimit] = useState(DEFAULT_CONFIDENCE_LIMIT);
  const [shouldOnlyDisplayConfidentPredictions, setShouldOnlyDisplayConfidentPredictions] = useState(false);

  const confidentPredictions: SchedulePrediction[] = schedulePredictions.filter((schedulePrediction: SchedulePrediction) => {
    return SchedulePredictionUtils.isPredictionConfident(schedulePrediction, confidenceLimit / 100);
  });

  const predictions = shouldOnlyDisplayConfidentPredictions ? confidentPredictions : schedulePredictions;
  const weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap = SchedulePredictionUtils.getWeekNumberToSchedulePredictionsMap(predictions);
  const sequentialWeekNumbers: string[] = Object.keys(weekNumberToSchedulePredictionsMap);
  const currentWeek: string = sequentialWeekNumbers.pop() ?? "";

  const handleConfidenceLimitSliderEvent = (event: any) => {
    const newConfidenceLimitStr: string = event.target.value ?? confidenceLimit.toString();
    const newConfidenceLimit: number = parseFloat(newConfidenceLimitStr) / 10;
    setConfidenceLimit(newConfidenceLimit);
  }

  const handleDisplayConfidentPredictionsOnlyToggle = (event: any) => {
    setShouldOnlyDisplayConfidentPredictions(event.target.checked)
  }

  const accuracy: SchedulePredictionsAccuracy = SchedulePredictionUtils.getAccuracyFromSchedulePredictions(
    schedulePredictions,
    confidenceLimit / 100
  );

  return (
    <div>
      <div className={styles['predictions-results']}>
        <PredictionAccuracyResultsComponent 
          accuracy={accuracy}
          confidenceLimit={confidenceLimit}
          handleConfidenceLimitSliderEvent={handleConfidenceLimitSliderEvent}
        />
      </div>
      <div className={styles['confident-predictions-toggle']}>
        <div className={styles['confident-predictions-toggle-title']}>
          Only Display Confident Predictions?
        </div>
        <input className={styles['confident-predictions-toggle-checkbox']} type="checkbox" checked={shouldOnlyDisplayConfidentPredictions} onChange={handleDisplayConfidentPredictionsOnlyToggle} />
      </div>
      <div className={styles['list-of-weekly-matchups']}>
        {renderMatchupsForWeeks([currentWeek], weekNumberToSchedulePredictionsMap, confidenceLimit)}
        <div className={`${styles['header']} ${styles['completed-header']}`}>Completed</div>
        {renderMatchupsForWeeks(sequentialWeekNumbers, weekNumberToSchedulePredictionsMap, confidenceLimit)}
      </div>
    </div>
  );
}

function renderMatchupsForWeeks(
  weekNumbers: string[], 
  weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap,
  confidenceLimit: number
): JSX.Element[] {
  return weekNumbers.map((weekNumber: string) => {
    const schedulePredictions: SchedulePrediction[] = weekNumberToSchedulePredictionsMap[weekNumber];
    const dateToSchedulePredictionsMap: DateToSchedulePredictionsMap = SchedulePredictionUtils.getDateToSchedulePredictionsMap(schedulePredictions);
    const dates: string[] = Object.keys(dateToSchedulePredictionsMap);
    return (
      <div key={`matchups-for-weeks-${Math.random()}`}>
        <div className={styles['week-number']}>Week {weekNumber}</div>
        {renderMatchupsForWeek(dates, dateToSchedulePredictionsMap, confidenceLimit)}
      </div>
    );
  });
}

function renderMatchupsForWeek(
  dates: string[], 
  dateToSchedulePredictionsMap: DateToSchedulePredictionsMap,
  confidenceLimit: number
): JSX.Element[] {
  return dates.map((date: string) => {
    const dayOfWeek: Day = dateToSchedulePredictionsMap[date][0].dayOfWeek;
    const printableDate: string = TimeUtils.getPrintableDateFromDateAndDayOfWeek(date, dayOfWeek);
    return (
      <div key={date}>
        <div className={styles['date']}>{printableDate}</div>
        <div className={styles['week-matchups']}>
          {dateToSchedulePredictionsMap[date].map((schedulePrediction: SchedulePrediction) => renderSchedulePredictionRow(schedulePrediction, confidenceLimit))}
        </div>
      </div>
    );
  });
}

function renderSchedulePredictionRow(schedulePrediction: SchedulePrediction, confidenceLimit: number): JSX.Element {
  const shouldHighlight: boolean = SchedulePredictionUtils.isPredictionConfident(schedulePrediction, confidenceLimit / 100);
  const hasOccurred: boolean = SchedulePredictionUtils.hasPredictionOccurred(schedulePrediction);
  const isCorrect: boolean = SchedulePredictionUtils.isPredictionCorrect(schedulePrediction);

  return(
    <div key={`matchupbox-${schedulePrediction.scheduleId}`} className={styles['matchup-box']}>
      <TeamMatchupBoxComponent 
        schedulePrediction={schedulePrediction} 
        shouldHighlight={shouldHighlight} 
        isCorrect={isCorrect} 
        hasOccurred={hasOccurred}
      />
    </div>
  );
}