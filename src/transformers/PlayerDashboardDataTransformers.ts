import { QuarterbackGame, QuarterbackPerformanceLineChartDatapoint, QuarterbackDataAggregation } from "../types/QBDashboardTypes";

export function aggregateQuarterbackGameData(games: QuarterbackGame[]): QuarterbackDataAggregation {
  const avgPassingTouchdownsAmt = games.reduce((a, g) => a + g.passingTouchdownsAmt, 0) / games.length;
  const avgPassingAttemptsAmt = games.reduce((a, g) => a + g.passingAttemptsAmt, 0) / games.length;
  const avgPassingCompletionsAmt = games.reduce((a, g) => a + g.passingCompletionsAmt, 0) / games.length;
  const avgPassingCompletionPctg = avgPassingCompletionsAmt / avgPassingAttemptsAmt;
  const avgPassingYardageAmt = games.reduce((a, g) => a + g.passingYardageAmt, 0) / games.length;

  const maxPassingTouchdownsAmt = games.reduce((max, g) => Math.max(max, g.passingTouchdownsAmt), games[0].passingTouchdownsAmt);
  const maxPassingAttemptsAmt = games.reduce((max, g) => Math.max(max, g.passingAttemptsAmt), games[0].passingAttemptsAmt);
  const maxPassingCompletionsAmt = games.reduce((max, g) => Math.max(max, g.passingCompletionsAmt), games[0].passingCompletionsAmt);
  const maxPassingCompletionPctg = games.reduce(
    (max, g) => Math.max(max, g.passingCompletionsAmt / g.passingAttemptsAmt),
    games[0].passingCompletionsAmt / games[0].passingAttemptsAmt,
  );
  const maxPassingYardageAmt = games.reduce((max, g) => Math.max(max, g.passingYardageAmt), games[0].passingCompletionsAmt);

  const minPassingTouchdownsAmt = games.reduce((min, g) => Math.min(min, g.passingTouchdownsAmt), games[0].passingTouchdownsAmt);
  const minPassingAttemptsAmt = games.reduce((min, g) => Math.min(min, g.passingAttemptsAmt), games[0].passingAttemptsAmt);
  const minPassingCompletionsAmt = games.reduce((min, g) => Math.min(min, g.passingCompletionsAmt), games[0].passingCompletionsAmt);
  const minPassingCompletionPctg = games.reduce(
    (min, g) => Math.min(min, g.passingCompletionsAmt / g.passingAttemptsAmt),
    games[0].passingCompletionsAmt / games[0].passingAttemptsAmt,
  );
  const minPassingYardageAmt = games.reduce((min, g) => Math.min(min, g.passingYardageAmt), games[0].passingCompletionsAmt);

  return {
    gamesAmt: games.length,
    // Avg values
    avgPassingTouchdownsAmt,
    avgPassingAttemptsAmt,
    avgPassingCompletionsAmt,
    avgPassingCompletionPctg,
    avgPassingYardageAmt,
    // Max values
    maxPassingTouchdownsAmt,
    maxPassingAttemptsAmt,
    maxPassingCompletionsAmt,
    maxPassingCompletionPctg,
    maxPassingYardageAmt,
    // Min values
    minPassingTouchdownsAmt,
    minPassingAttemptsAmt,
    minPassingCompletionsAmt,
    minPassingCompletionPctg,
    minPassingYardageAmt,
  }
}

export function transformQuarterbackGameData(games: QuarterbackGame[]): QuarterbackPerformanceLineChartDatapoint[] {
  return games.map((game: QuarterbackGame) => ({
      ...game,
      passingCompletionPctg: (100 * (game.passingCompletionsAmt / game.passingAttemptsAmt)).toFixed(2)
    })
  );
}
