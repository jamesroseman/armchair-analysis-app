import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import GetPlayerAbbrFromNameQuery from '../queries/GetDashPlayerTypeaheadFromNameQuery';

type DashboardPlayerTypeahead = {
  firstName: string,
  lastName: string,
  playerAbbr: string,
  primaryPosition: string
}

type DashboardPlayerQueryResponse = {
  loading: boolean;
  data: {
    dashPlayerTypeahead: [DashboardPlayerTypeahead];
  }
}

type PlayerSelectorRendererProps = {
  lastName?: string
}

const PlayerSelectorRenderer = ({ lastName }: PlayerSelectorRendererProps) => {
  return (!lastName || lastName.length < 2) ? null : (
    <Query query={GetPlayerAbbrFromNameQuery} variables={{ lastName }}>
      {({ loading, data }: DashboardPlayerQueryResponse) => !loading && (
        <ul>
          {data.dashPlayerTypeahead.map((player) => (
            <li key={`li.${player.playerAbbr}`}>
            <Link target="_blank" key={player.playerAbbr} to={`/p/${player.playerAbbr}`}>
                {player.lastName}, {player.firstName} ({player.primaryPosition})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Query>
  )
}

export default PlayerSelectorRenderer;
