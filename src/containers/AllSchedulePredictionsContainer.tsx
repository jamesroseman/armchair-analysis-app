import React, { useState } from 'react';
import PredictionAccuracyResultsComponent from '../components/PredictionAccuracyResultsComponent';
import BettingSimulationInlineComponent from '../components/BettingSimulationInlineComponent';
import TeamMatchupBoxComponent from '../components/TeamMatchupBoxComponent';
import { Day } from '../types/ModelConstantTypes';
import { SchedulePrediction, SchedulePredictionsAccuracy } from '../types/SchedulePredictionTypes';
import { DateToSchedulePredictionsMap, SchedulePredictionUtils, WeekNumberToSchedulePredictionsMap } from '../utils/SchedulePredictionUtils';
import { TimeUtils } from '../utils/TimeUtils';
import styles from './AllSchedulePredictionsContainer.module.css';
import { BettingOddsUtils, BettingSimulation } from '../utils/BettingOddsUtils';
import BettingSimulationResultsComponent from '../components/BettingSimulationResultsComponent';

type AllSchedulePredictionsContainerProps = {
  schedulePredictions: SchedulePrediction[],
}

const DEFAULT_CONFIDENCE_LIMIT: number = 59.3;
const DEFAULT_STAKE: number = 1;

export default ({ schedulePredictions }: AllSchedulePredictionsContainerProps) => {
  if (schedulePredictions.length === 0) { 
    return <div>No schedule predictions were found.</div> 
  }

  const [confidenceLimit, setConfidenceLimit] = useState(DEFAULT_CONFIDENCE_LIMIT);
  const [stake, setStake] = useState(DEFAULT_STAKE);
  const [shouldOnlyDisplayConfidentPredictions, setShouldOnlyDisplayConfidentPredictions] = useState(false);

  const confidentPredictions: SchedulePrediction[] = schedulePredictions.filter((schedulePrediction: SchedulePrediction) => {
    return SchedulePredictionUtils.isPredictionConfident(schedulePrediction, confidenceLimit / 100);
  });
  const predictions = shouldOnlyDisplayConfidentPredictions ? confidentPredictions : schedulePredictions;
  const weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap = SchedulePredictionUtils.getWeekNumberToSchedulePredictionsMap(predictions);
  const weekNumberToConfidentSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap = SchedulePredictionUtils.getWeekNumberToSchedulePredictionsMap(confidentPredictions);
  const sequentialWeekNumbers: string[] = Object.keys(weekNumberToSchedulePredictionsMap);
  
  // If all of the games in a week have occurred, the games should be listed in the "completed" section.
  const occurredWeeks: string[] = sequentialWeekNumbers.filter(
    (weekNumber: string) => {
      const schedulePredictions: SchedulePrediction[] = weekNumberToSchedulePredictionsMap[weekNumber];
      return schedulePredictions.reduce(
        (agg: boolean, schedulePrediction: SchedulePrediction) => {
          const hasOccurred: boolean = SchedulePredictionUtils.hasPredictionOccurred(schedulePrediction);
          return hasOccurred && agg;
        },
        true
      );
    },
  );

  // If any of the games in a week are scheduled and have not occurred, the games should be listed in the "scheduled" section.
  const scheduledWeeks: string[] = sequentialWeekNumbers.filter(
    (weekNumber: string) => {
      const schedulePredictions: SchedulePrediction[] = weekNumberToSchedulePredictionsMap[weekNumber];
      return schedulePredictions.reduce(
        (agg: boolean, schedulePrediction: SchedulePrediction) => {
          const isScheduled: boolean = !SchedulePredictionUtils.hasPredictionOccurred(schedulePrediction);
          return isScheduled || agg;
        },
        false
      );
    },
  );

  const handleConfidenceLimitSliderEvent = (event: any) => {
    const newConfidenceLimitStr: string = event.target.value ?? confidenceLimit.toString();
    const newConfidenceLimit: number = parseFloat(newConfidenceLimitStr) / 10;
    setConfidenceLimit(newConfidenceLimit);
  }

  const handleStakeSliderEvent = (event: any) => {
    const newStakeStr: string = event.target.value ?? stake.toString();
    const newStake: number = parseInt(newStakeStr);
    setStake(newStake);
  }

  const handleDisplayConfidentPredictionsOnlyToggle = (event: any) => {
    setShouldOnlyDisplayConfidentPredictions(event.target.checked)
  }

  const accuracy: SchedulePredictionsAccuracy = SchedulePredictionUtils.getAccuracyFromSchedulePredictions(
    schedulePredictions,
    confidenceLimit / 100
  );

  const weekNumberToSimulationMap: { [weekNumber: string]: BettingSimulation } = occurredWeeks.reduce(
    (acc: { [weekNumber: string]: BettingSimulation }, weekNumber: string) => {
      const predictions: SchedulePrediction[] = weekNumberToConfidentSchedulePredictionsMap[weekNumber] ?? [];
      const simulation: BettingSimulation = BettingOddsUtils.getMultipleBettingSimulationFromSchedulePredictions(stake, predictions);
      return {
        ...acc,
        [weekNumber]: simulation,
      };
    },
    {}
  );
  const simulation: BettingSimulation = BettingOddsUtils.combineBettingSimulations(
    Object.values(weekNumberToSimulationMap),
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
      <div className={styles['betting-simulation']}>
        <BettingSimulationResultsComponent
          simulation={simulation}
          setStake={stake}
          handleStakeSliderEvent={handleStakeSliderEvent}
        />
      </div>
      <div className={styles['confident-predictions-toggle']}>
        <div className={styles['confident-predictions-toggle-title']}>
          Only Display Confident Predictions?
        </div>
        <div className={styles['confident-predictions-toggle-checkbox']}>
          <input type="checkbox" checked={shouldOnlyDisplayConfidentPredictions} onChange={handleDisplayConfidentPredictionsOnlyToggle} />
        </div>
      </div>
      <div className={styles['list-of-weekly-matchups']}>
        {renderMatchupsForWeeks(scheduledWeeks, weekNumberToSchedulePredictionsMap, confidenceLimit)}
        <div className={`${styles['header']} ${styles['completed-header']}`}>Completed</div>
        {renderMatchupsForWeeks(occurredWeeks, weekNumberToSchedulePredictionsMap, confidenceLimit, weekNumberToSimulationMap)}
      </div>
    </div>
  );
}

function renderMatchupsForWeeks(
  weekNumbers: string[], 
  weekNumberToSchedulePredictionsMap: WeekNumberToSchedulePredictionsMap,
  confidenceLimit: number,
  weekNumberToSimulationMap: { [weekNumber: string]: BettingSimulation } = {}
): JSX.Element[] {
  return weekNumbers.map((weekNumber: string) => {
    const schedulePredictions: SchedulePrediction[] = weekNumberToSchedulePredictionsMap[weekNumber];
    const dateToSchedulePredictionsMap: DateToSchedulePredictionsMap = SchedulePredictionUtils.getDateToSchedulePredictionsMap(schedulePredictions);
    const dates: string[] = Object.keys(dateToSchedulePredictionsMap);
    return (
      <div key={`matchups-for-weeks-${Math.random()}`}>
        <div className={styles['week-number']}>Week {weekNumber}</div>
        {weekNumberToSimulationMap.hasOwnProperty(weekNumber) ? <BettingSimulationInlineComponent simulation={weekNumberToSimulationMap[weekNumber]} /> : null}
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
  const cardClassName: string = shouldHighlight 
  ? (
    hasOccurred 
    ? (isCorrect ? styles['matchup-box-card-highlight-correct'] : styles['matchup-box-card-highlight-incorrect'] )
    : styles['matchup-box-card-highlight']
  )
  : "";

  return(
    <div key={`matchupbox-${schedulePrediction.scheduleId}`} className={styles['matchup-box']}>
      <TeamMatchupBoxComponent 
        schedulePrediction={schedulePrediction} 
        cardClassName={cardClassName}
      />
    </div>
  );
}