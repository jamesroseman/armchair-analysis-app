import { SchedulePrediction } from "../types/SchedulePredictionTypes";
import { setPowerset } from "mathjs";
import { SchedulePredictionUtils } from "./SchedulePredictionUtils";

export enum BetType {
  Powerset = 1,
  Accumulator
}

export type Bet = {
  type: BetType,
  odds: number,
  stake: number,
  payout: number,
  predictions: SchedulePrediction[]
}

/**
 * Represents profit and loss in betting on
 * any number of teams based on win expectation.
 */
export type BettingSimulation = {
  stake: number,
  payout: number,
  profit: number,
  bets: Bet[]
}

export class BettingOddsUtils {

  /**
   * Helper method to combine betting simulations (across stakes, profit, and payouts).
   */
  public static combineBettingSimulations(
    simulations: BettingSimulation[],
  ): BettingSimulation {
    return simulations.reduce(
      (acc: BettingSimulation, simulation: BettingSimulation) => ({
        stake: acc.stake + simulation.stake,
        payout: acc.payout + simulation.payout,
        profit: acc.profit + simulation.profit,
        bets: [...acc.bets, ...simulation.bets]
      }),
      {
        stake: 0,
        payout: 0,
        profit: 0,
        bets: []
      } as BettingSimulation
    );
  }

  /**
   * Simulate betting the same amount on each part of a multi-way bet. Bets on every possible combination
   * of the provided predictions, then compares them to the results (if there are any).
   * @param stake The stake of each individual bet. A $5 stake on a 3-way multiple bet would result
   * in a total stake of $35.
   * 
   * This method is particularly resource heavy. Use carefully.
   */
  public static getMultipleBettingSimulationFromSchedulePredictions(
    stake: number,
    schedulePredictions: SchedulePrediction[]
  ): BettingSimulation {
    // The MathJS library only accepts number[] as input, so we use
    // indices of the schedule predictions here.
    const schedulePredictionIndices: number[] = schedulePredictions.map((_: SchedulePrediction, i: number) => i);

    // The types for this package are incorrect. setPowerset returns a multi-dimensional array
    // but its type indicates that it only returns a one-dimensional array.
    const indexPowerset: number[][] = (setPowerset(schedulePredictionIndices) as unknown as number[][])
      .filter((indices: number[]) => indices.length > 0);

    const bets: Bet[] = indexPowerset.map((indices: number[]) => {
      const predictionsForBet: SchedulePrediction[] = indices.map((index: number) => schedulePredictions[index]);
      return this.getAccumulatorBetFromSchedulePredictions(stake, predictionsForBet);
    });
    
    // A $5 multiple bet results in a stake of $5 * the amount of outcomes.
    const totalStake: number = bets.length * stake;
    const totalPayout: number = bets.reduce(
      (acc: number, bet: Bet) => acc + bet.payout,
      0
    );
    const profit: number = totalPayout - totalStake;
    return {
      stake: totalStake,
      payout: totalPayout,
      profit,
      bets
    } as BettingSimulation;
  }

  public static getAccumulatorBetFromSchedulePredictions(
    stake: number,
    predictions: SchedulePrediction[]
  ): Bet {
    const correctPredictions: SchedulePrediction[] = predictions.filter(SchedulePredictionUtils.isPredictionCorrect);
    const scheduledPredictions: SchedulePrediction[] = predictions.filter(SchedulePredictionUtils.isPredictionScheduled);
    const shouldPayout: boolean = (correctPredictions.length + scheduledPredictions.length) === predictions.length;

    // Calculate the total moneyline multiplier
    const accumulatedOdds: number = predictions.reduce(
      (acc: number, schedulePrediction: SchedulePrediction) => {
        const didBetOnVisitingTeam: boolean = schedulePrediction.visitingTeamEloWinExp > 0.5;
        if (didBetOnVisitingTeam) {
          return acc * (schedulePrediction.bettingOdds?.visitingMoneylineOdds ?? 1);
        } else {
          return acc * (schedulePrediction.bettingOdds?.homeMoneylineOdds ?? 1);
        }
      },
      1
    );
    const payout: number = stake * accumulatedOdds;

    return {
      type: BetType.Accumulator,
      odds: accumulatedOdds,
      stake,
      payout: shouldPayout ? payout : 0,
      predictions
    } as Bet;
  }
  
}