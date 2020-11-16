import React from 'react';
import { Query } from "react-apollo";
import SchedulePredictionContainer from '../containers/SchedulePredictionContainer';
import { GetSchedulePredictionQuery, GetSchedulePredictionQueryResponse } from '../queries/GetSchedulePredictionQuery';

type SchedulePredictionRendererProps = {
  scheduleId: string,
}

export default ({ scheduleId }: SchedulePredictionRendererProps) => {
  return (
    <Query query={GetSchedulePredictionQuery} variables={{ scheduleId }}>
      {({ loading, data }: GetSchedulePredictionQueryResponse) => !loading &&
        <SchedulePredictionContainer schedulePrediction={data?.schedulePrediction} />
      }
    </Query>
  );
};