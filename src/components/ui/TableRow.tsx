import React, { FunctionComponent } from 'react';
import styles from './TableRow.module.css';

export type TableRowProps = {

}

const TableRow: FunctionComponent<TableRowProps> = ({ children }) => {
  return (
    <tr className={styles['tr']}>
      {children}
    </tr>
  );
}

export default TableRow;