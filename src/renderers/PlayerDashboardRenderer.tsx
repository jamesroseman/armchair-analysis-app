import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PlayerDashboardPassingTableComponent from '../components/PlayerDashboardPassingTableComponent';

type DashboardPlayerGame = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  seasonYear: number
}

type DashboardPlayer = {
  demographicData: {
    playerAbbr: string,
    firstName: string,
    lastName: string
  };
  playerGames: DashboardPlayerGame[];
}

type DashboardPlayerQueryResponse = {
  loading: boolean;
  data: {
    dashPlayer: DashboardPlayer;
  }
}

export const GET_PLAYER = gql`
  query GetPlayer($playerAbbr:String!){
    dashPlayer(playerAbbr: $playerAbbr) {
      demographicData {
        playerAbbr,
        firstName,
        lastName
      },
      playerGames {
        gameId,
        passingAttemptsAmt,
        passingCompletionsAmt,
        seasonYear
      }
    }
  }
`;

type PlayerViewerProps = {
  playerAbbr: string
}

export default ({ playerAbbr }: PlayerViewerProps) => (
  <Query query={GET_PLAYER} variables={{ playerAbbr }}>
    {({ loading, data }: DashboardPlayerQueryResponse) => !loading && (
      <div>
        <h1>{data.dashPlayer.demographicData.firstName} {data.dashPlayer.demographicData.lastName} Player Dashboard</h1>
        <PlayerDashboardPassingTableComponent player={data.dashPlayer} />
      </div>
    )}
  </Query>
)
