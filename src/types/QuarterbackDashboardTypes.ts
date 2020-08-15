export type QuarterbackGame = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  seasonYear: number
}

export type QuarterbackPerformanceLineChartDatapoint = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  passingCompletionPctg: string,
  seasonYear: number
}

export type QuarterbackDataAggregation = {
  gamesAmt: number,
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
