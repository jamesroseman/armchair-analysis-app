export type QuarterbackGame = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  passingTouchdownsAmt: number,
  passingYardageAmt: number,
  seasonYear: number
}

export type QuarterbackPerformanceLineChartDatapoint = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  passingCompletionPctg: string,
  passingTouchdownsAmt: number,
  passingYardageAmt: number,
  seasonYear: number
}

export type QuarterbackDataAggregation = {
  gamesAmt: number,

  avgPassingTouchdownsAmt: number,
  avgPassingAttemptsAmt: number,
  avgPassingCompletionsAmt: number,
  avgPassingCompletionPctg: number,
  avgPassingYardageAmt: number,

  maxPassingTouchdownsAmt: number,
  maxPassingAttemptsAmt: number,
  maxPassingCompletionsAmt: number,
  maxPassingCompletionPctg: number,
  maxPassingYardageAmt: number,

  minPassingTouchdownsAmt: number,
  minPassingAttemptsAmt: number,
  minPassingCompletionsAmt: number,
  minPassingCompletionPctg: number,
  minPassingYardageAmt: number
}
