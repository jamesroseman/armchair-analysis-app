import gql from 'graphql-tag';
import { SchedulePrediction } from '../types/SchedulePredictionTypes';

export type GetSchedulePredictionsQueryResponse = {
  loading: boolean;
  data: {
    schedulePredictions: SchedulePrediction[],
  }
}

export const GetSchedulePredictionsQuery = gql`
  query GetSchedulePredictions {
    schedulePredictions {
      scheduleId,
      gameId,
      game {
        pointsScoredHomeAmt,
        pointsScoredVisitorAmt,
        visitorPointSpreadNo
      },
      bettingOdds {
        homeMoneylineOdds,
        visitingMoneylineOdds
      },
      weekNumber,
      seasonYear,
      dayOfWeek,
      date,
      homeTeamName,
      homeTeamEloRating,
      homeTeamEloRatingRank,
      homeTeamEloWinExp,
      visitingTeamName,
      visitingTeamEloRating,
      visitingTeamEloRatingRank,
      visitingTeamEloWinExp
    }
  }
`;