import React, { FunctionComponent } from 'react';
import styles from './Table.module.css';

export type TableProps = {

};

const Table: FunctionComponent<TableProps> = ({ children }) => {
  return (
    <table className={styles['table']}>
      {children}
    </table>
  );
}

export default Table;