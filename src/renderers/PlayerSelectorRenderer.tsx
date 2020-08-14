import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

type DashboardPlayerTypeahead = {
  firstName: string,
  lastName: string,
  playerAbbr: string
}

type DashboardPlayerQueryResponse = {
  loading: boolean;
  data: {
    dashPlayerTypeahead: [DashboardPlayerTypeahead];
  }
}

export const GET_PLAYER_ABBR = gql`
  query GetPlayerAbbrFromName($lastName: String){
    dashPlayerTypeahead(lastName: $lastName) {
      firstName,
      lastName,
      playerAbbr
    }
  }
`;

type PlayerSelectorRendererProps = {
  lastName?: string
}

const PlayerSelectorRenderer = ({ lastName }: PlayerSelectorRendererProps) => {
  return (!lastName || lastName.length < 2) ? null : (
    <Query query={GET_PLAYER_ABBR} variables={{ lastName }}>
      {({ loading, data }: DashboardPlayerQueryResponse) => !loading && (
        <ul>
          {data.dashPlayerTypeahead.map((player) => (
            <li key={`li.${player.playerAbbr}`}>
            <Link target="_blank" key={player.playerAbbr} to={`/p/${player.playerAbbr}`}>
                {player.lastName}, {player.firstName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Query>
  )
}

export default PlayerSelectorRenderer;
