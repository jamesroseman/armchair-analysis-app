import React from "react";
import { BettingSimulation } from "../utils/BettingOddsUtils"
import styles from "./BettingSimulationInlineComponent.module.css";

type BettingSimulationInlineComponentProps = {
  simulation: BettingSimulation
}

export default ({ simulation }: BettingSimulationInlineComponentProps) => {
  const {
    stake,
    profit,
    bets
  } = simulation;
  const betCount: number = bets.length;

  if (stake === 0) {
    return null;
  }

  const profitStr: string = profit > 0
  ? `Profit of €${profit.toFixed(2)}`
  : `Loss of €${(profit * -1).toFixed(2)}`;

  return (
    <div className={styles['title']}>
      {profitStr} on €{stake.toFixed(2)} over {betCount} bets.
    </div>
  );
}