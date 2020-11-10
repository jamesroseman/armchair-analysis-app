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
  const prettyPrintNumber: (num: number, digits?: number) => string = (num: number, digits: number = 2) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
  };

  const betCount: number = bets.length;

  if (stake === 0) {
    return null;
  }

  const profitStr: string = profit > 0
  ? `Profit of €${prettyPrintNumber(profit)}`
  : `Loss of €${prettyPrintNumber(profit * -1)}`;

  return (
    <div className={styles['title']}>
      {profitStr} on €{prettyPrintNumber(stake)} over {prettyPrintNumber(betCount, 0)} bets.
    </div>
  );
}