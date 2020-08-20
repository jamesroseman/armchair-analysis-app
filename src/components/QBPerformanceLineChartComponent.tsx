import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { QuarterbackGame } from '../types/QBDashboardTypes';
import { transformQuarterbackGameData } from '../transformers/PlayerDashboardDataTransformers';

type QBPerformanceLineChartComponentProps = {
  data: QuarterbackGame[]
}

export default ({ data }: QBPerformanceLineChartComponentProps) => {
  const dataThisSeason = data.filter((g: QuarterbackGame) => g.seasonYear === 2019);
  const transformedDataThisSeason = transformQuarterbackGameData(dataThisSeason);

  return (
    <LineChart width={600} height={300} data={transformedDataThisSeason}>
      <Line type="monotone" dataKey="passingCompletionPctg" stroke="#8884a8" />
      <Line type="monotone" dataKey="passingCompletionsAmt" stroke="#8867a8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="gameId" />
      <YAxis dataKey="passingCompletionPctg" />
      <YAxis dataKey="passingCompletionsAmt" />
      <Tooltip />
    </LineChart>
  )
}
