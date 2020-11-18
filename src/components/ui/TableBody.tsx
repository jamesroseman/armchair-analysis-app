import React, { FunctionComponent } from 'react';
import styles from './TableBody.module.css';

export type TableBodyProps = {

}

const TableBody: FunctionComponent<TableBodyProps> = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export default TableBody;