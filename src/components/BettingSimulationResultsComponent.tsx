import React from 'react';
import { BettingSimulation } from "../utils/BettingOddsUtils";
import styles from "./BettingSimulationResultsComponent.module.css";

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

  return (
    <div>
      <div>
        <div className={styles['results-card']}>
          <table className={styles['results-header']}>
            <thead>
              <tr className={styles['tr']}>
                <th className={styles['th']}>Bets</th>
                <th className={styles['th']}>Stake</th>
                <th className={styles['th']}>Payout</th>
                <th className={styles['th']}>Profit</th>
                <th className={styles['th']}>Profit Margin</th>
                <th className={styles['th']}>Stake</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles['tr']}>
                <td className={`${styles['td']} ${styles['data']}`}>{bets.length}</td>
                <td className={`${styles['td']} ${styles['data']}`}>€{prettyPrintNumber(stake)}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{payoutStr}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{profitStr}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{prettyPrintNumber(profitMargin)}%</td>
                <td className={`${styles['td']} ${styles['data']} ${styles['stake']}`}>{prettyPrintNumber(setStake, 0)}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles['stake-slider']} >
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={setStake} 
              onChange={handleStakeSliderEvent} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}