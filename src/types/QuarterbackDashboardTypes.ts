export type QuarterbackGame = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  passingTouchdownsAmt: number,
  seasonYear: number
}

export type QuarterbackPerformanceLineChartDatapoint = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  passingCompletionPctg: string,
  passingTouchdownsAmt: number,
  seasonYear: number
}

export type QuarterbackDataAggregation = {
  gamesAmt: number,
  avgPassingTouchdownsAmt: number,
  avgPassingAttemptsAmt: number,
  avgPassingCompletionsAmt: number,
  avgPassingCompletionPctg: number,
  maxPassingAttemptsAmt: number,
  maxPassingCompletionsAmt: number,
  maxPassingCompletionPctg: number,
  minPassingAttemptsAmt: number,
  minPassingCompletionsAmt: number,
  minPassingCompletionPctg: number,
}
