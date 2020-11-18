import React, { FunctionComponent } from 'react';
import styles from './TableHead.module.css';

export type TableHeadProps = {

}

const TableHead: FunctionComponent<TableHeadProps> = ({ children }) => {
  return (
    <thead>
      {children}
    </thead>
  );
}

export default TableHead;