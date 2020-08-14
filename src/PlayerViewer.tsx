import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

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
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Game ID</th>
            <th>Season</th>
            <th>Passing Attempts</th>
            <th>Passing Completions</th>
            <th>Passing Percentage</th>
          </tr>
        </thead>
        <tbody>
        {data.dashPlayer.playerGames.map((playerGame: DashboardPlayerGame) => (
          <tr key={playerGame.gameId}>
              <td>{data.dashPlayer.demographicData.firstName}</td>
              <td>{data.dashPlayer.demographicData.lastName}</td>
              <td>{playerGame.gameId}</td>
              <td>{playerGame.seasonYear}</td>
              <td>{playerGame.passingAttemptsAmt}</td>
              <td>{playerGame.passingCompletionsAmt}</td>
              <td>{playerGame.passingCompletionsAmt / playerGame.passingAttemptsAmt}</td>
            </tr>
        ))}
        </tbody>
      </Table>
    )}
  </Query>
)
