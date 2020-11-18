import React, { CSSProperties } from "react";
import { SchedulePredictionsAccuracy } from "../types/SchedulePredictionTypes"
import Card from "./ui/Card";
import SliderInput from "./ui/SliderInput";
import Table from "./ui/Table";
import TableBody from "./ui/TableBody";
import TableHead from "./ui/TableHead";
import TableRow from "./ui/TableRow";
import TableTd, { TdType } from "./ui/TableTd";
import TableTh, { ThType } from "./ui/TableTh";

type PredictionAccuracyResultsComponentProps = {
  accuracy: SchedulePredictionsAccuracy,
  confidenceLimit: number,
  handleConfidenceLimitSliderEvent: (event: React.ChangeEvent) => void,
}

export default ({ accuracy, confidenceLimit, handleConfidenceLimitSliderEvent }: PredictionAccuracyResultsComponentProps) => {
  const { 
    predictionsAmt,
    confidentPredictionsAmt,
    againstTheSpreadPredictionsAmt,
    correctPredictionsAmt,
    correctConfidentPredictionsAmt,
    correctAgainstTheSpreadPredictionsAmt,
    predictionsGuessRate,
    confidentPredictionsGuessRate,
    againstTheSpreadPredictionsGuessRate
  } = accuracy;

  const tdProperties: CSSProperties = { width: 150, height: 30 };
  const confidenceLimitProperties: CSSProperties = { ...tdProperties, backgroundColor: 'rgb(204, 226, 221)' };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableTh></TableTh>
            <TableTh type={ThType.Number}>Correct Predictions</TableTh>
            <TableTh type={ThType.Number}>Predictions</TableTh>
            <TableTh type={ThType.Number}>Guess Rate</TableTh>
            <TableTh type={ThType.Number}>Confidence Limit</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableTd type={TdType.Title}>Predictions</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{correctPredictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{predictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{(predictionsGuessRate * 100).toFixed(1)}%</TableTd>
            <TableTd properties={confidenceLimitProperties} type={TdType.Number}>{confidenceLimit.toFixed(1)}%</TableTd>
          </TableRow>
          <TableRow>
            <TableTd type={TdType.Title}>Confident Predictions</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{correctConfidentPredictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{confidentPredictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{(confidentPredictionsGuessRate * 100).toFixed(1)}%</TableTd>
          </TableRow>
          <TableRow>
            <TableTd type={TdType.Title}>Against the Spread Predictions</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{correctAgainstTheSpreadPredictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{againstTheSpreadPredictionsAmt}</TableTd>
            <TableTd properties={tdProperties} type={TdType.Number}>{(againstTheSpreadPredictionsGuessRate * 100).toFixed(1)}%</TableTd>
          </TableRow>
        </TableBody>
      </Table>
      <SliderInput min={530} max={850} value={confidenceLimit * 10} onChange={handleConfidenceLimitSliderEvent} />
    </Card>
  );
}