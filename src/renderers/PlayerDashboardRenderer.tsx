import React from 'react';
import { Query } from 'react-apollo';
import GetPlayerFromAbbrQuery from '../queries/GetPlayerForDashboardQuery';
import { Player } from '../types/PlayerDashboardTypes';
import PlayerDashboardContainer from '../containers/PlayerDashboardContainer';


type DashboardPlayerQueryResponse = {
  loading: boolean;
  data: {
    dashPlayer: Player;
  }
}

type PlayerDashboardProps = {
  playerAbbr: string
}

export default ({ playerAbbr }: PlayerDashboardProps) => (
  <Query query={GetPlayerFromAbbrQuery} variables={{ playerAbbr }}>
    {({ loading, data }: DashboardPlayerQueryResponse) => !loading && (
      <PlayerDashboardContainer player={data.dashPlayer} />
    )}
  </Query>
)
