import React, { useState, CSSProperties } from 'react';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { SchedulePredictionAggregationMetric } from '../types/SchedulePredictionAggregationMetricTypes';
import styles from './HeadToHeadTableComponent.module.css';
import { TeamName } from '../types/ModelConstantTypes';
import Table from './ui/Table';
import Card from './ui/Card';
import TableHead from './ui/TableHead';
import TableRow from './ui/TableRow';
import TableTh, { ThType } from './ui/TableTh';
import TableBody from './ui/TableBody';
import TableTd, { TdType } from './ui/TableTd';
import InlineTeamNameWithRank from './InlineTeamNameWithRank';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import { SchedulePredictionAggregationMetricUtils } from '../utils/SchedulePredictionAggregationMetricUtils';
import { HIGHLIGHT_COLOR, INCORRECT_COLOR } from './CSSConstants';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import tinycolor from 'tinycolor2';

type HeadToHeadTableComponentProps = {
  schedulePrediction: SchedulePrediction
}

export default ({ 
  schedulePrediction
}: HeadToHeadTableComponentProps) => {
  const { 
    homeTeamName,
    homeTeamEloRatingRank,
    visitingTeamName, 
    visitingTeamEloRatingRank,
    metrics 
  } = schedulePrediction;
  const [shouldOnlyDisplayUnevenMetrics, setShouldOnlyDisplayUnevenMetrics] = useState(false);
  const [shouldOnlyDisplaySignificantMetrics, setShouldOnlyDisplaySignificantMetrics] = useState(false);

  return (
    <div className={styles['root']}>
      <div className={styles['toggles']}>
        <div className={styles['toggle']}>
          <div className={styles['toggle-title']}>
            Only Display Uneven Metrics?
          </div>
          <div className={styles['toggle-checkbox']}>
            <input 
              type="checkbox" 
              checked={shouldOnlyDisplayUnevenMetrics} 
              onChange={() => setShouldOnlyDisplayUnevenMetrics(!shouldOnlyDisplayUnevenMetrics)} 
            />
          </div>
        </div>
        <div className={styles['toggle']}>
          <div className={styles['toggle-title']}>
            Only Display Significant Metrics?
          </div>
          <div className={styles['toggle-checkbox']}>
            <input 
              type="checkbox" 
              checked={shouldOnlyDisplaySignificantMetrics} 
              onChange={() => setShouldOnlyDisplaySignificantMetrics(!shouldOnlyDisplaySignificantMetrics)} 
            />
          </div>
        </div>
      </div>
      <div className={styles['head-to-head']}>
        {metrics?.map((metric: SchedulePredictionAggregationMetric) => genTableForMetric(
          homeTeamName,
          homeTeamEloRatingRank,
          visitingTeamName,
          visitingTeamEloRatingRank,
          metric,
          shouldOnlyDisplayUnevenMetrics,
          shouldOnlyDisplaySignificantMetrics
        ))}
      </div>
    </div>
  );
}

function genTableForMetric(
  homeTeamName: TeamName,
  homeTeamEloRatingRank: number,
  visitingTeamName: TeamName,
  visitingTeamEloRatingRank: number,
  metric: SchedulePredictionAggregationMetric,
  shouldOnlyDisplayUnevenMetrics: boolean = false,
  shouldOnlyDisplaySignificantMetrics: boolean = false,
): JSX.Element {
  const isUnevenMetric: boolean = SchedulePredictionAggregationMetricUtils.isMetricUneven(metric);
  const isSignificantMetric: boolean = SchedulePredictionAggregationMetricUtils.isMetricSignificant(metric, 5);
  if (shouldOnlyDisplayUnevenMetrics && !isUnevenMetric) {
    return <></>;
  }
  if (shouldOnlyDisplaySignificantMetrics && !isSignificantMetric) {
    return <></>;
  }
  if (shouldOnlyDisplaySignificantMetrics && shouldOnlyDisplayUnevenMetrics && (!isUnevenMetric || !isSignificantMetric)) {
    return <></>;
  }

  const {
    homeTeamMetricRank,
    homeTeamMetricAmt,
    homeTeamMetricAvg,
    allowedHomeTeamMetricRank,
    allowedHomeTeamMetricAmt,
    allowedHomeTeamMetricAvg,
    visitingTeamMetricRank,
    visitingTeamMetricAmt,
    visitingTeamMetricAvg,
    allowedVisitingTeamMetricRank,
    allowedVisitingTeamMetricAmt,
    allowedVisitingTeamMetricAvg,
    metricName
  } = metric;

  const cardProperties: CSSProperties = {
    marginBottom: 20,
  }

  const cardBodyProperties: CSSProperties = getCardBodyProperties(isSignificantMetric, isUnevenMetric);

  return (
    <Card 
      title={formatMetricName(metricName)}
      properties={cardProperties}
      bodyProperties={cardBodyProperties}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableTh></TableTh>
            <TableTh></TableTh>
            <TableTh type={ThType.Number}>Total</TableTh>
            <TableTh type={ThType.Number}>Avg.</TableTh>
            <TableTh type={ThType.Number}>Rank</TableTh>
            <TableTh type={ThType.Number}>Total All.</TableTh>
            <TableTh type={ThType.Number}>Avg. All.</TableTh>
            <TableTh type={ThType.Number}>Rank All.</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderMetricRow(
            isSignificantMetric,
            isUnevenMetric,
            visitingTeamName,
            visitingTeamEloRatingRank,
            visitingTeamMetricRank,
            visitingTeamMetricAmt,
            visitingTeamMetricAvg,
            allowedVisitingTeamMetricRank,
            allowedVisitingTeamMetricAmt,
            allowedVisitingTeamMetricAvg,
          )}
          {renderMetricRow(
            isSignificantMetric,
            isUnevenMetric,
            homeTeamName,
            homeTeamEloRatingRank,
            homeTeamMetricRank,
            homeTeamMetricAmt,
            homeTeamMetricAvg,
            allowedHomeTeamMetricRank,
            allowedHomeTeamMetricAmt,
            allowedHomeTeamMetricAvg,
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

function renderMetricRow(
  isSignificantMetric: boolean,
  isUnevenMetric: boolean,
  teamName: TeamName,
  teamEloRatingRank: number,
  teamMetricRank: number,
  teamMetricAmt: number,
  teamMetricAvg: number,
  allowedTeamMetricRank?: number,
  allowedTeamMetricAmt?: number,
  allowedTeamMetricAvg?: number,
): JSX.Element {
  const tdRankProperties: CSSProperties = getTdRankProperties(isSignificantMetric, isUnevenMetric, teamName);
  return (
    <TableRow>
      <TableTd type={TdType.LeftImg}>
        <TeamLogoImageComponent teamName={teamName} />
      </TableTd>
      <TableTd>
        <InlineTeamNameWithRank teamName={teamName} rank={teamEloRatingRank} />
      </TableTd>
      <TableTd type={TdType.Number}>{teamMetricAmt}</TableTd>
      <TableTd type={TdType.Number}>{teamMetricAvg.toFixed(1)}</TableTd>
      <TableTd properties={tdRankProperties} type={TdType.Number}>#{teamMetricRank}</TableTd>
      <TableTd type={TdType.Number}>{allowedTeamMetricAmt ?? '-'}</TableTd>
      <TableTd type={TdType.Number}>{allowedTeamMetricAvg?.toFixed(1) ?? '-'}</TableTd>
      <TableTd properties={tdRankProperties} type={TdType.Number}>{allowedTeamMetricRank ? `#${allowedTeamMetricRank}` : '-'}</TableTd>
    </TableRow>
  );
}

function getCardBodyProperties(isSignificantMetric: boolean, isUnevenMetric: boolean): CSSProperties {
  if (isSignificantMetric) {
    return {
      outline: `1px solid ${HIGHLIGHT_COLOR}`,
    };
  }
  if (isUnevenMetric) {
    return {
      outline: `1px solid ${INCORRECT_COLOR}`,
    };
  }
  return {};
}

function getTdRankProperties(
  isSignificantMetric: boolean, 
  isUnevenMetric: boolean,
  teamName: TeamName
): CSSProperties {
  if (isSignificantMetric || isUnevenMetric) {
    // Choose the right legible combination of primary/secondary/white/black colors.
    const primaryColor: string = TeamNameUtils.getPrimaryColorFromTeamName(teamName);
    const isPrimaryColorLight: boolean = tinycolor(primaryColor).isLight();
    const secondaryColor: string = TeamNameUtils.getSecondaryColorFromTeamName(teamName);
    const isSecondaryColorLight: boolean = tinycolor(secondaryColor).isLight();
    // Prefer a dark text on a light background
    const backgroundColor: string = isPrimaryColorLight ? primaryColor : secondaryColor;
    const fontColor: string = tinycolor(backgroundColor).isLight()
    ? (isSecondaryColorLight ? '#000' : secondaryColor)
    : (isSecondaryColorLight ? secondaryColor : '#fff');
    
    return {
      backgroundColor: backgroundColor,
      color: fontColor
    }
  }
  return {};
}

// Metric names are in CamelCase which is not human-friendly
function formatMetricName(name: string) {
  const result: string = name.replace( /([A-Z])/g, " $1" );
  const finalResult: string = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult.replace("Amt", "");
}