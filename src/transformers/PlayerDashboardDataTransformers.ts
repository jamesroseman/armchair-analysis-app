import { QuarterbackGame, QuarterbackPerformanceLineChartDatapoint, QuarterbackDataAggregation } from "../types/QuarterbackDashboardTypes";

export function aggregateQuarterbackGameData(games: QuarterbackGame[]): QuarterbackDataAggregation {
  const avgPassingAttemptsAmt = games.reduce((a, g) => a + g.passingAttemptsAmt, 0) / games.length;
  const avgPassingCompletionsAmt = games.reduce((a, g) => a + g.passingCompletionsAmt, 0) / games.length;
  const avgPassingCompletionPctg = avgPassingCompletionsAmt / avgPassingAttemptsAmt;
  const avgPassingTouchdownsAmt = games.reduce((a, g) => a + g.passingTouchdownsAmt, 0) / games.length;

  const maxPassingAttemptsAmt = games.reduce((max, g) => Math.max(max, g.passingAttemptsAmt), games[0].passingAttemptsAmt);
  const maxPassingCompletionsAmt = games.reduce((max, g) => Math.max(max, g.passingCompletionsAmt), games[0].passingCompletionsAmt);
  const maxPassingCompletionPctg = games.reduce(
    (max, g) => Math.max(max, g.passingCompletionsAmt / g.passingAttemptsAmt),
    games[0].passingCompletionsAmt / games[0].passingAttemptsAmt,
  );

  const minPassingAttemptsAmt = games.reduce((min, g) => Math.min(min, g.passingAttemptsAmt), games[0].passingAttemptsAmt);
  const minPassingCompletionsAmt = games.reduce((min, g) => Math.min(min, g.passingCompletionsAmt), games[0].passingCompletionsAmt);
  const minPassingCompletionPctg = games.reduce(
    (min, g) => Math.min(min, g.passingCompletionsAmt / g.passingAttemptsAmt),
    games[0].passingCompletionsAmt / games[0].passingAttemptsAmt,
  );

  return {
    gamesAmt: games.length,
    avgPassingAttemptsAmt,
    avgPassingCompletionsAmt,
    avgPassingCompletionPctg,
    avgPassingTouchdownsAmt,
    maxPassingAttemptsAmt,
    maxPassingCompletionsAmt,
    maxPassingCompletionPctg,
    minPassingAttemptsAmt,
    minPassingCompletionsAmt,
    minPassingCompletionPctg
  }
}

export function transformQuarterbackGameData(games: QuarterbackGame[]): QuarterbackPerformanceLineChartDatapoint[] {
  return games.map((game: QuarterbackGame) => {
    // Calculate the completion percentage
    const passingCompletionPctgRaw = 100 * (game.passingCompletionsAmt / game.passingAttemptsAmt);
    const passingCompletionPctg = passingCompletionPctgRaw.toFixed(2);
    return {
      ...game,
      passingCompletionPctg
    }
  })
}
