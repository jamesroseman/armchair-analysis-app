import React from 'react';
import { Table } from 'reactstrap';
import { QuarterbackDataAggregation } from '../types/QuarterbackDashboardTypes';
import styles from './PlayerDashboardPassingInsightsTableComponent.module.css';

type PlayerDashboardPassingInsightsTableProps = {
  aggregation: QuarterbackDataAggregation
}

export default ({ aggregation }: PlayerDashboardPassingInsightsTableProps) => {
  return (
    <Table striped className={styles.table}>
      <thead>
        <tr>
          <th>Games</th>
          <th>Attempts</th>
          <th>Completions</th>
          <th>Completion %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{aggregation.gamesAmt}</td>
          <td>{aggregation.avgPassingAttemptsAmt.toFixed(1)}</td>
          <td>{aggregation.avgPassingCompletionsAmt.toFixed(1)}</td>
          <td>{(100 * aggregation.avgPassingCompletionPctg).toFixed(1)}</td>
        </tr>
      </tbody>
    </Table>
  )
}
