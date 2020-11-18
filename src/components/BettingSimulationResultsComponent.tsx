import React, { CSSProperties } from 'react';
import { BettingSimulation } from "../utils/BettingOddsUtils";
import Card from './ui/Card';
import SliderInput from './ui/SliderInput';
import Table from './ui/Table';
import TableBody from './ui/TableBody';
import TableHead from './ui/TableHead';
import TableRow from './ui/TableRow';
import TableTd, { TdType } from './ui/TableTd';
import TableTh, { ThType } from './ui/TableTh';

type BettingSimulationResultsComponentProps = {
  simulation: BettingSimulation,
  setStake: number,
  handleStakeSliderEvent: (event: React.ChangeEvent) => void,
}

export default({ simulation, setStake, handleStakeSliderEvent }: BettingSimulationResultsComponentProps) => {
  const {
    stake,
    payout,
    profit,
    stdDev,
    bets
  } = simulation;

  const prettyPrintNumber: (num: number, digits?: number) => string = (num: number, digits: number = 2) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
  };

  const profitMargin: number = 100 * (profit / stake);
  const payoutStr: string = payout < 0
  ? `-€${prettyPrintNumber(-payout)}`
  : `€${prettyPrintNumber(payout)}`;
  const profitStr: string = profit < 0
  ? `-€${prettyPrintNumber(-profit)}`
  : `€${prettyPrintNumber(profit)}`;

  const tdProperties: CSSProperties = { height: 30 };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableTh type={ThType.Number}>Bets</TableTh>
            <TableTh type={ThType.Number}>Stake</TableTh>
            <TableTh type={ThType.Number}>Payout</TableTh>
            <TableTh type={ThType.Number}>Profit</TableTh>
            <TableTh type={ThType.Number}>Deviation</TableTh>
            <TableTh type={ThType.Number}>Profit Margin</TableTh>
            <TableTh type={ThType.Number}>Stake</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableTd properties={tdProperties} type={TdType.Number}>{bets.length}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>€{prettyPrintNumber(stake)}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{payoutStr}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{profitStr}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>€{prettyPrintNumber(stdDev)}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{prettyPrintNumber(profitMargin)}%</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{prettyPrintNumber(setStake, 0)}</TableTd>
          </TableRow>
        </TableBody>
      </Table>
      <SliderInput min={1} max={15} value={setStake} onChange={handleStakeSliderEvent} />
    </Card>
  );
}