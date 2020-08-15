import React from 'react';
import { Query } from 'react-apollo';
import PlayerDashboardPassingTableComponent from '../components/PlayerDashboardPassingTableComponent';
import PlayerDashboardGamePerformanceLineChartComponent from '../components/QuarterbackDashboardGamePerformanceLineChartComponent';
import GetPlayerFromAbbrQuery from '../queries/GetDashPlayerFromPlayerAbbrQuery';
import { Player } from '../types/PlayerDashboardTypes';
import PlayerDashboardPassingInsightsTableComponent from '../components/PlayerDashboardPassingInsightsTableComponent';
import { aggregateQuarterbackGameData } from '../transformers/PlayerDashboardDataTransformers';


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
    {({ loading, data }: DashboardPlayerQueryResponse) => !loading && (
      <div>
        <h1>{data.dashPlayer.demographicData.firstName} {data.dashPlayer.demographicData.lastName} Player Dashboard ({data.dashPlayer.demographicData.primaryPosition})</h1>
        <PlayerDashboardGamePerformanceLineChartComponent data={data.dashPlayer.playerGames} />
        <PlayerDashboardPassingInsightsTableComponent aggregation={aggregateQuarterbackGameData(data.dashPlayer.playerGames)} />
        <PlayerDashboardPassingTableComponent player={data.dashPlayer} />
      </div>
    )}
  </Query>
)
