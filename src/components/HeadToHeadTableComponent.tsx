import React from 'react';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { SchedulePredictionAggregationMetric } from '../types/SchedulePredictionAggregationMetricTypes';
import styles from './HeadToHeadTableComponent.module.css';

type HeadToHeadTableComponentProps = {
  schedulePrediction: SchedulePrediction
}

export default ({ schedulePrediction }: HeadToHeadTableComponentProps) => {
  const { metrics } = schedulePrediction;

  return (
    <div className={styles['head-to-head']}>
      {metrics?.map(genTableForMetric)}
    </div>
  );
}

function genTableForMetric(metric: SchedulePredictionAggregationMetric): JSX.Element {
  return (
    <table className={styles['table']} key={`table-${metric.schedulePredictionId}`}>
      <tbody>
        {genRowsForMetric(metric)}
      </tbody>
    </table>
  );
}

function genRowsForMetric(metric: SchedulePredictionAggregationMetric): JSX.Element[] {
  const isAllowableMetric: boolean = metric.allowedMetricName !== null;
  if (isAllowableMetric) {
    return genRowsForAllowableMetric(metric);
  }

  const {
    metricName,
    homeTeamMetricRank,
    homeTeamMetricAmt,
    homeTeamMetricAvg,
    visitingTeamMetricRank,
    visitingTeamMetricAmt,
    visitingTeamMetricAvg,
  } = metric;

  const titleTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['title']} ${styles['visitor-td']}`}>
        {metricName}
      </td>
      <td className={styles['mid-td']}>
      </td>
      <td className={`${styles['td']} ${styles['title']} ${styles['home-td']}`}>
        {metricName}
      </td>
    </tr>
  );
  const rankTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        #{visitingTeamMetricRank} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Rank
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        #{homeTeamMetricRank}
      </td>
    </tr>
  );
  const totalTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingTeamMetricAmt} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Total
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeTeamMetricAmt}
      </td>
    </tr>
  );
  const avgTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingTeamMetricAvg.toFixed(1)}
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Avg
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeTeamMetricAvg.toFixed(1)}
      </td>
    </tr>
  );
  return [
    titleTr,
    rankTr,
    totalTr,
    avgTr
  ];
}

function genRowsForAllowableMetric(metric: SchedulePredictionAggregationMetric): JSX.Element[] {
  const {
    metricName,
    homeTeamMetricRank,
    homeTeamMetricAmt,
    homeTeamMetricAvg,
    visitingTeamMetricRank,
    visitingTeamMetricAmt,
    visitingTeamMetricAvg,
    allowedMetricName,
    allowedHomeTeamMetricRank,
    allowedHomeTeamMetricAmt,
    allowedHomeTeamMetricAvg,
    allowedVisitingTeamMetricRank,
    allowedVisitingTeamMetricAmt,
    allowedVisitingTeamMetricAvg,
  } = metric;

  const titleTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['title']} ${styles['visitor-td']}`}>
        {formatMetricName(metricName)}
      </td>
      <td className={styles['mid-td']}>
      </td>
      <td className={`${styles['td']} ${styles['title']} ${styles['home-td']}`}>
        {formatMetricName(allowedMetricName ?? "")}
      </td>
    </tr>
  );
  const allowedTitleTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['title']} ${styles['visitor-td']}`}>
        {formatMetricName(allowedMetricName ?? "")}
      </td>
      <td className={styles['mid-td']}>
      </td>
      <td className={`${styles['td']} ${styles['title']} ${styles['home-td']}`}>
        {formatMetricName(metricName)}
      </td>
    </tr>
  );

  const rankTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        #{visitingTeamMetricRank} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Rank
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        #{allowedHomeTeamMetricRank}
      </td>
    </tr>
  );
  const allowedRankTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        #{allowedVisitingTeamMetricRank} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Rank
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        #{homeTeamMetricRank}
      </td>
    </tr>
  );

  const totalTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingTeamMetricAmt} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Total
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {allowedHomeTeamMetricAmt}
      </td>
    </tr>
  );
  const allowedTotalTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {allowedVisitingTeamMetricAmt} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Total
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeTeamMetricAmt}
      </td>
    </tr>
  );

  const avgTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingTeamMetricAvg.toFixed(1)}
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Avg
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {(allowedHomeTeamMetricAvg ?? 0).toFixed(1)}
      </td>
    </tr>
  );
  const allowedAvgTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {(allowedVisitingTeamMetricAvg ?? 0).toFixed(1)}
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Avg
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeTeamMetricAvg.toFixed(1)}
      </td>
    </tr>
  );

  return [
    titleTr,
    rankTr,
    totalTr,
    avgTr,
    allowedTitleTr,
    allowedRankTr,
    allowedTotalTr,
    allowedAvgTr
  ];
}

// Metric names are in CamelCase which is not human-friendly
function formatMetricName(name: string) {
  const result: string = name.replace( /([A-Z])/g, " $1" );
  const finalResult: string = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult.replace("Amt", "");
}