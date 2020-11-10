import React from 'react';
import { Query } from "react-apollo";
import AllSchedulePredictionsContainer from '../containers/AllSchedulePredictionsContainer';
import { GetSchedulePredictionsQuery, GetSchedulePredictionsQueryResponse } from '../queries/GetSchedulePredictionsQuery';

export default () => (
  <Query query={GetSchedulePredictionsQuery}>
    {({ loading, data }: GetSchedulePredictionsQueryResponse) => !loading && 
      <AllSchedulePredictionsContainer schedulePredictions={data?.schedulePredictions ?? []} />
    }
  </Query>
);