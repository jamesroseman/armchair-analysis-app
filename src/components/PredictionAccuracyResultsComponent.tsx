import React from "react";
import { SchedulePredictionsAccuracy } from "../types/SchedulePredictionTypes"
import styles from "./PredictionAccuracyResultsComponent.module.css";

type PredictionAccuracyResultsComponentProps = {
  accuracy: SchedulePredictionsAccuracy,
  confidenceLimit: number,
  handleConfidenceLimitSliderEvent: (event: React.ChangeEvent) => void,
}

export default ({ accuracy, confidenceLimit, handleConfidenceLimitSliderEvent }: PredictionAccuracyResultsComponentProps) => {
  const { 
    predictionsAmt,
    confidentPredictionsAmt,
    againstTheSpreadPredictionsAmt,
    correctPredictionsAmt,
    correctConfidentPredictionsAmt,
    correctAgainstTheSpreadPredictionsAmt,
    predictionsGuessRate,
    confidentPredictionsGuessRate,
    againstTheSpreadPredictionsGuessRate
  } = accuracy;

  return (
    <div>
      <div>
        <div className={styles['results-card']}>
          <table className={styles['results-header']}>
            <thead>
              <tr className={styles['tr']}>
                <th className={styles['title']}></th>
                <th className={styles['th']}>Correct Predictions</th>
                <th className={styles['th']}>Predictions</th>
                <th className={styles['th']}>Guess Rate</th>
                <th className={styles['th']}>Confidence Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles['tr']}>
                <td className={`${styles['td']} ${styles['title']}`}>Predictions</td>
                <td className={`${styles['td']} ${styles['data']}`}>{correctPredictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{predictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{(predictionsGuessRate * 100).toFixed(1)}%</td>
                <td className={`${styles['td']} ${styles['data']} ${styles['confidence-limit']}`}>{confidenceLimit.toFixed(1)}%</td>
              </tr>
              <tr className={styles['tr']}>
                <td className={`${styles['td']} ${styles['title']}`}>Confident Predictions</td>
                <td className={`${styles['td']} ${styles['data']}`}>{correctConfidentPredictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{confidentPredictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{(confidentPredictionsGuessRate * 100).toFixed(1)}%</td>
              </tr>
              <tr className={styles['tr']}>
                <td className={`${styles['td']} ${styles['title']}`}>Against the Spread Predictions</td>
                <td className={`${styles['td']} ${styles['data']}`}>{correctAgainstTheSpreadPredictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{againstTheSpreadPredictionsAmt}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{(againstTheSpreadPredictionsGuessRate * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
          <div className={styles['confidence-limit-slider']} >
            <input 
              type="range" 
              min="530" 
              max="850" 
              value={confidenceLimit * 10} 
              onChange={handleConfidenceLimitSliderEvent} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}