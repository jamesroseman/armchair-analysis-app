import React, { CSSProperties } from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';
import { SchedulePredictionUtils } from '../utils/SchedulePredictionUtils';
import { TimeUtils } from '../utils/TimeUtils';
import InlineTeamNameWithRank from './InlineTeamNameWithRank';
import TeamLogoImageComponent from './TeamLogoImageComponent';
import Card from './ui/Card';
import Table from './ui/Table';
import TableBody from './ui/TableBody';
import TableRow from './ui/TableRow';
import TableTd, { TdType } from './ui/TableTd';
import Link from './ui/Link';

type TeamMatchupBoxComponentProps = {
  schedulePrediction: SchedulePrediction,
  properties?: CSSProperties,
  bodyProperties?: CSSProperties,
  shouldDisplayMoneylineAsDecimal?: boolean
}

export default ({ 
  schedulePrediction, 
  properties, 
  bodyProperties,
  shouldDisplayMoneylineAsDecimal = true
}: TeamMatchupBoxComponentProps) => {
  const { 
    scheduleId,
    visitingTeamName,
    visitingTeamEloRatingRank,
    visitingTeamEloWinExp,
    homeTeamName,
    homeTeamEloRatingRank,
    homeTeamEloWinExp,
    game,
    bettingOdds
  } = schedulePrediction;
  const isScheduled: boolean = !SchedulePredictionUtils.hasPredictionOccurred(schedulePrediction);
  const didVisitorWin: boolean = game ? (game.pointsScoredVisitorAmt > game.pointsScoredHomeAmt) : false;
  const didHomeWin: boolean = game ? (game.pointsScoredHomeAmt > game.pointsScoredVisitorAmt) : false;

  // Only display the point spread for the favored team (the team with a negative point spread).
  let visitorPointSpreadNo: number | undefined = undefined;
  let homePointSpreadNo: number | undefined = undefined;
  if (game !== null && typeof(game) !== "undefined") {
    visitorPointSpreadNo = game.visitorPointSpreadNo < 0
    ? game.visitorPointSpreadNo
    : undefined;
    homePointSpreadNo = game.visitorPointSpreadNo > 0
    ? game.visitorPointSpreadNo * -1
    : undefined;
  }

  const timeStr: string = TimeUtils.getPrintableTimeFromDate(schedulePrediction.date);
  const visitingMoneylineStr: string = getMoneylineStr(bettingOdds?.visitingMoneylineOdds ?? 1, shouldDisplayMoneylineAsDecimal);
  const homeMoneylineStr: string = getMoneylineStr(bettingOdds?.homeMoneylineOdds ?? 1, shouldDisplayMoneylineAsDecimal);

  return (
    <Link href={`/s/${scheduleId}`}>
      <Card
        properties={{ width: 350, ...properties }}
        bodyProperties={bodyProperties}
        title={isScheduled ? timeStr : "FINAL"}
      >
        <Table>
          <TableBody>
            {renderRowForTeam(
              visitingTeamName, 
              visitorPointSpreadNo, 
              visitingTeamEloRatingRank, 
              visitingTeamEloWinExp, 
              visitingMoneylineStr,
              isScheduled,
              didVisitorWin,
              game?.pointsScoredVisitorAmt,
            )}
            {renderRowForTeam(
              homeTeamName, 
              homePointSpreadNo, 
              homeTeamEloRatingRank, 
              homeTeamEloWinExp, 
              homeMoneylineStr,
              isScheduled,
              didHomeWin,
              game?.pointsScoredHomeAmt,
            )}
          </TableBody>
        </Table>
      </Card>
    </Link>
  );
};

function getMoneylineStr(
  moneylineDecimal: number,
  shouldDisplayMoneylineAsDecimal: boolean
): string {
  if (shouldDisplayMoneylineAsDecimal) {
    return moneylineDecimal.toFixed(2);
  } else {
    const moneylinePctg: number = (1 / moneylineDecimal) * 100;
    return `${moneylinePctg.toFixed(2)}%`;
  }
}

function renderRowForTeam(
  teamName: TeamName,
  teamPointSpreadNo: number | undefined,
  teamEloRatingRank: number,
  teamEloWinExp: number,
  teamMoneylineStr: string,
  isScheduled: boolean,
  didWin: boolean,
  pointsScored?: number
): JSX.Element {
  // CSS Properties for each cell
  const pointSpreadProperties: CSSProperties = {
    backgroundColor: '#fff',
  }
  const moneylineProperties: CSSProperties = {
    backgroundColor: '#fff',
    color: 'rgb(77, 114, 68)',
  }
  const winExpProperties: CSSProperties = {
    backgroundColor: getWinExpColor(teamEloWinExp)
  }
  const pointsScoredProperties: CSSProperties = isScheduled
  ? { content: '-' }
  : { 
    backgroundColor: '#fff',
    textAlign: 'right'
  }

  return (
    <TableRow>
      <TableTd type={TdType.LeftImg}>
        <TeamLogoImageComponent teamName={teamName} />
      </TableTd>
      <TableTd>
        <InlineTeamNameWithRank teamName={teamName} rank={teamEloRatingRank} />
      </TableTd>
      <TableTd properties={pointSpreadProperties} type={TdType.Number}>{teamPointSpreadNo}</TableTd>
      <TableTd properties={moneylineProperties} type={TdType.Number}>{teamMoneylineStr}</TableTd>
      <TableTd properties={winExpProperties} type={TdType.Number}>{`${(teamEloWinExp * 100).toFixed(2)}%`}</TableTd>
      <TableTd checkmark={didWin} properties={pointsScoredProperties} type={TdType.Number}>{pointsScored ?? '-'}</TableTd>
    </TableRow>
  );
}

function getWinExpColor(winExp: number): string {
  const r: number = 182;
  const floorG: number = 157;
  // Win expectation color ranges from 197 to 255
  // for the g-value.
  const g: number = (winExp * 100) + floorG;
  const b: number = 233;
  return `rgb(${r}, ${g}, ${b})`;
}