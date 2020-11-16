import React from 'react';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import styles from './HeadToHeadTableComponent.module.css';

type HeadToHeadTableComponentProps = {
  schedulePrediction: SchedulePrediction
}

export default ({ schedulePrediction: SchedulePrediction }: HeadToHeadTableComponentProps) => {
  const {
    // Points Scored
    visitingPointsScoredRank,
    visitingPointsScoredAmt,
    visitingPointsScoredAmtAvg,
    visitingPointsAllowedRank,
    visitingPointsAllowedAmt,
    visitingPointsAllowedAmtAvg,
    homePointsScoredRank,
    homePointsScoredAmt,
    homePointsScoredAmtAvg,
    homePointsAllowedRank,
    homePointsAllowedAmt,
    homePointsAllowedAmtAvg,
    // Rushing Yards
    visitingRushingYardsRank,
    visitingRushingYardsAmt,
    visitingRushingYardsAllowedRank,
    visitingRushingYardsAllowedAmt,
    homeRushingYardsRank,
    homeRushingYardsAmt,
    homeRushingYardsAllowedRank,
    homeRushingYardsAllowedAmt,
    // Passing Yards
    visitingPassingYardsRank,
    visitingPassingYardsAmt,
    visitingPassingYardsAllowedRank,
    visitingPassingYardsAllowedAmt,
    homePassingYardsRank,
    homePassingYardsAmt,
    homePassingYardsAllowedRank,
    homePassingYardsAllowedAmt,
  } = SchedulePrediction;

  const pointsScoredMetricsParams: GenRowsForMetricsParams = {
    metricName: "Points Scored",
    allowedMetricName: "Points Allowed",
    visitingMetricRank: visitingPointsScoredRank,
    visitingMetricAmt: visitingPointsScoredAmt,
    visitingMetricAmtAvg: visitingPointsScoredAmtAvg,
    visitingAllowedMetricRank: visitingPointsAllowedRank,
    visitingAllowedMetricAmt: visitingPointsAllowedAmt,
    visitingAllowedMetricAmtAvg: visitingPointsAllowedAmtAvg,
    homeMetricRank: homePointsScoredRank,
    homeMetricAmt: homePointsScoredAmt,
    homeMetricAmtAvg: homePointsScoredAmtAvg,
    homeAllowedMetricRank: homePointsAllowedRank,
    homeAllowedMetricAmt: homePointsAllowedAmt,
    homeAllowedMetricAmtAvg: homePointsAllowedAmtAvg
  };

  const rushingYardsMetricsParams: GenRowsForMetricsParams = {
    metricName: "Rushing Yards",
    allowedMetricName: "Rushing Yards Allowed",
    visitingMetricAmt: visitingRushingYardsAmt,
    visitingMetricRank: visitingRushingYardsRank,
    visitingAllowedMetricAmt: visitingRushingYardsAllowedAmt,
    visitingAllowedMetricRank: visitingRushingYardsAllowedRank,
    homeMetricAmt: homeRushingYardsAmt,
    homeMetricRank: homeRushingYardsRank,
    homeAllowedMetricRank: homeRushingYardsAllowedRank,
    homeAllowedMetricAmt: homeRushingYardsAllowedAmt,
  };

  const passingYardsMetricsParams: GenRowsForMetricsParams = {
    metricName: "Passing Yards",
    allowedMetricName: "Passing Yards Allowed",
    visitingMetricAmt: visitingPassingYardsAmt,
    visitingMetricRank: visitingPassingYardsRank,
    visitingAllowedMetricAmt: visitingPassingYardsAllowedAmt,
    visitingAllowedMetricRank: visitingPassingYardsAllowedRank,
    homeMetricAmt: homePassingYardsAmt,
    homeMetricRank: homePassingYardsRank,
    homeAllowedMetricRank: homePassingYardsAllowedRank,
    homeAllowedMetricAmt: homePassingYardsAllowedAmt,
  };
  
  return (
    <div className={styles['head-to-head']}>
      <table className={styles['table']}>
        <thead>
          <tr>
            <th></th>
            <th className={styles['th']}>Aggregation Stats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {genRowsForMetric(pointsScoredMetricsParams)}
          {genRowsForMetric(rushingYardsMetricsParams)}
          {genRowsForMetric(passingYardsMetricsParams)}
        </tbody>
      </table>
    </div>
  )
}

type GenRowsForMetricsParams = {
  metricName: string,
  allowedMetricName: string,
  visitingMetricRank: number,
  visitingMetricAmtAvg?: number,
  visitingMetricAmt: number,
  visitingAllowedMetricRank: number,
  visitingAllowedMetricAmtAvg?: number,
  visitingAllowedMetricAmt: number,
  homeMetricRank: number,
  homeMetricAmtAvg?: number,
  homeMetricAmt: number,
  homeAllowedMetricRank: number,
  homeAllowedMetricAmtAvg?: number,
  homeAllowedMetricAmt: number,
}

function genRowsForMetric({
  metricName,
  allowedMetricName,
  visitingMetricRank,
  visitingMetricAmtAvg,
  visitingMetricAmt,
  visitingAllowedMetricRank,
  visitingAllowedMetricAmtAvg,
  visitingAllowedMetricAmt,
  homeMetricRank,
  homeMetricAmtAvg,
  homeMetricAmt,
  homeAllowedMetricRank,
  homeAllowedMetricAmtAvg,
  homeAllowedMetricAmt,
}: GenRowsForMetricsParams): JSX.Element[] {
  const titleTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['title']} ${styles['visitor-td']}`}>
        {metricName}
      </td>
      <td className={styles['mid-td']}>
      </td>
      <td className={`${styles['td']} ${styles['title']} ${styles['home-td']}`}>
        {allowedMetricName}
      </td>
    </tr>
  );
  const rankTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        #{visitingMetricRank} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Rank
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        #{homeAllowedMetricRank}
      </td>
    </tr>
  );
  const totalTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingMetricAmt} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Total
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeAllowedMetricAmt}
      </td>
    </tr>
  );
  const avgTr: JSX.Element = (typeof(visitingMetricAmtAvg) !== "undefined" &&  typeof(homeAllowedMetricAmtAvg) !== "undefined")
  ? (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingMetricAmtAvg.toFixed(1)}
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Avg
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeAllowedMetricAmtAvg.toFixed(1)}
      </td>
    </tr>
  )
  : <></>;
  const allowedTitleTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['title']} ${styles['visitor-td']}`}>
        {allowedMetricName}
      </td>
      <td className={styles['mid-td']}>
      </td>
      <td className={`${styles['td']} ${styles['title']} ${styles['home-td']}`}>
        {metricName}
      </td>
    </tr>
  );
  const allowedRankTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        #{visitingAllowedMetricRank} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Rank
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        #{homeMetricRank}
      </td>
    </tr>
  );
  const allowedTotalTr: JSX.Element = (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingAllowedMetricAmt} 
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Total
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeMetricAmt}
      </td>
    </tr>
  );
  const allowedAvgTr: JSX.Element = (typeof(visitingAllowedMetricAmtAvg) !== "undefined" &&  typeof(homeMetricAmtAvg) !== "undefined")
  ? (
    <tr className={`${styles['tr']}`}>
      <td className={`${styles['td']} ${styles['data']} ${styles['visitor-td']}`}>
        {visitingAllowedMetricAmtAvg.toFixed(1)}
      </td>
      <td className={`${styles['mid-td']} ${styles['mid-title']}`}>
        Avg
      </td>
      <td className={`${styles['td']} ${styles['data']} ${styles['home-td']}`}>
        {homeMetricAmtAvg.toFixed(1)}
      </td>
    </tr>
  )
  : <></>;

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