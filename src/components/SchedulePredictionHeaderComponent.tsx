import React, { CSSProperties } from 'react';
import { SchedulePredictionAggregationMetric } from '../types/SchedulePredictionAggregationMetricTypes';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { TeamRecord } from '../types/TeamTypes';
import { SchedulePredictionAggregationMetricUtils } from '../utils/SchedulePredictionAggregationMetricUtils';
import { TeamNameUtils } from '../utils/TeamNameUtils';
import { TimeUtils } from '../utils/TimeUtils';
import styles from './SchedulePredictionHeaderComponent.module.css';
import TeamLogoAndNameComponent from './TeamLogoAndNameComponent';

type SchedulePredictionHeaderComponentProps = {
  schedulePrediction: SchedulePrediction,
}

const HEX_OPACITY: string = "11";

export default ({ schedulePrediction }: SchedulePredictionHeaderComponentProps) => {
  const {
    visitingTeamName,
    homeTeamName,
    date,
    dayOfWeek,
    metrics
  } = schedulePrediction;
  const dateStr: string = TimeUtils.getPrintableDateFromDateAndDayOfWeek(
    date,
    dayOfWeek,
    true
  );
  const timeStr: string = TimeUtils.getPrintableTimeFromDate(
    date,
  );

  const homeRecord: TeamRecord | undefined = SchedulePredictionAggregationMetricUtils.getHomeRecordFromMetrics(metrics ?? []);
  const visitingRecord: TeamRecord | undefined = SchedulePredictionAggregationMetricUtils.getVisitingRecordFromMetrics(metrics ?? []);

  const visitingTeamPrimaryColor: string = TeamNameUtils.getPrimaryColorFromTeamName(visitingTeamName);
  const homeTeamPrimaryColor: string = TeamNameUtils.getPrimaryColorFromTeamName(homeTeamName);

  const visitingTeamProperties: CSSProperties = {
    borderTop: `1px solid ${visitingTeamPrimaryColor}`,
    borderLeft: `1px solid ${visitingTeamPrimaryColor}`,
    borderBottom: `1px solid ${visitingTeamPrimaryColor}`,
    background: `linear-gradient(90deg, ${visitingTeamPrimaryColor}${HEX_OPACITY}, white)`
  }
  
  const homeTeamProperties: CSSProperties = {
    borderTop: `1px solid ${homeTeamPrimaryColor}`,
    borderRight: `1px solid ${homeTeamPrimaryColor}`,
    borderBottom: `1px solid ${homeTeamPrimaryColor}`,
    background: `linear-gradient(90deg, white, ${homeTeamPrimaryColor}${HEX_OPACITY})`
  }

  const gameInfoProperties: CSSProperties = {
    background: `linear-gradient(90deg, ${visitingTeamPrimaryColor}, ${homeTeamPrimaryColor})`,
  }

  return (
    <div className={styles['header']}>
      <div 
        className={`${styles['team-logo-and-name']} ${styles['visiting-team']}`}
        style={visitingTeamProperties}
      >
        <TeamLogoAndNameComponent teamName={visitingTeamName} record={visitingRecord} />
      </div>

      <div 
        className={styles['game-info']}
        style={gameInfoProperties}
      >
        <div className={styles['text']}>
          <div className={styles['text-overlay']}>
            <div className={styles['date']}>
              <div className={styles['date-text']}>{dateStr}</div>
              <div className={styles['time-text']}>{timeStr}</div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`${styles['team-logo-and-name']} ${styles['home-team']}`}
        style={homeTeamProperties}
      >
        <TeamLogoAndNameComponent teamName={homeTeamName} record={homeRecord} />
      </div>
    </div>
  );
}