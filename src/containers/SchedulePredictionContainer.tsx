import React from 'react';
import HeadToHeadTableComponent from '../components/HeadToHeadTableComponent';
import SchedulePredictionHeaderComponent from '../components/SchedulePredictionHeaderComponent';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import styles from './SchedulePredictionContainer.module.css';

type SchedulePredictionContainerProps = {
  schedulePrediction: SchedulePrediction,
}

export default ({ schedulePrediction }: SchedulePredictionContainerProps) => {
  return (
    <div className={styles['schedule-prediction']}>
      <SchedulePredictionHeaderComponent schedulePrediction={schedulePrediction} />
      <HeadToHeadTableComponent schedulePrediction={schedulePrediction} />
    </div>
  );
}