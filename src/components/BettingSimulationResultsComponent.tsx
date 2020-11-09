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

  const profitMargin: number = 100 * (profit / stake);

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
                <td className={`${styles['td']} ${styles['data']}`}>€{stake.toFixed(2)}</td>
                <td className={`${styles['td']} ${styles['data']}`}>€{payout.toFixed(2)}</td>
                <td className={`${styles['td']} ${styles['data']}`}>€{profit.toFixed(2)}</td>
                <td className={`${styles['td']} ${styles['data']}`}>{profitMargin.toFixed(2)}%</td>
                <td className={`${styles['td']} ${styles['data']} ${styles['stake']}`}>{setStake}</td>
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