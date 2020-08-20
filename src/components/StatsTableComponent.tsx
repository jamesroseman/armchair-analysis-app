import React from 'react';
import { Table } from 'reactstrap';
import styles from './StatsTableComponent.module.css';

type StatsTableComponentProps = {
  headers: string[],
  rows: any[][]
}

export default ({ headers, rows }: StatsTableComponentProps) => (
  <Table striped className={styles.table}>
    <thead>
      {renderHeaders(headers)}
    </thead>
    <tbody>
      {renderRows(rows)}
    </tbody>
  </Table>
);

function renderHeaders(headers: string[]) {
  return (
    <tr>
      {headers.map((header) => <th key={`${Math.random()*100}-th`}>{header}</th>)}
    </tr>
  );
}

function renderRows(rows: string[][]) {
  return rows.map((row) => (
    <tr key={`${Math.random()*100}-tr`}>
      {row.map((cell) => (
        <td key={`${Math.random()*100}-td`}>{cell}</td>
      ))}
    </tr>
  ));
}
