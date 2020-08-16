import React from 'react';
import { Query } from 'react-apollo';
import GetPlayerFromAbbrQuery from '../queries/GetPlayerForDashboardQuery';
import { Player, PlayerPosition } from '../types/PlayerDashboardTypes';
import QBDashboardContainer from '../containers/QBDashboardContainer';


type DashboardPlayerQueryResponse = {
  loading: boolean;
  data: {
    dashPlayer: Player;
  }
}

type PlayerViewerProps = {
  playerAbbr: string
}

export default ({ playerAbbr }: PlayerViewerProps) => (
  <Query query={GetPlayerFromAbbrQuery} variables={{ playerAbbr }}>
    {({ loading, data }: DashboardPlayerQueryResponse) => !loading && renderDashboard(data.dashPlayer)}
  </Query>
)

function renderDashboard(player: Player) {
  if (player.demographicData.primaryPosition === PlayerPosition.Quarterback) {
    return <QBDashboardContainer player={player} />
  }
}
