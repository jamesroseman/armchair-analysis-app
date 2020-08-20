import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChartLine } from '../types/PerformanceLineChartTypes';

type PerformanceLineChartComponentProps = {
  lines: LineChartLine[],
  data: object[]
}

export default ({ lines, data }: PerformanceLineChartComponentProps) => {
  return (
    <LineChart width={800} height={500} data={data}>
      {lines.map((line) =>
        <Line key={`${line.dataKey}-line`} type={line.type ?? "monotone"} dataKey={line.dataKey} stroke={line.color} />
      )}
      {lines.map((line) =>
        <YAxis key={`${line.dataKey}-yaxis`} dataKey={line.dataKey} />
      )}
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="gameId" />
      <Tooltip />
    </LineChart>
  )
}
