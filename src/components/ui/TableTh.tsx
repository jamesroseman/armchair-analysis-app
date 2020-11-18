import React, { FunctionComponent } from 'react';
import styles from './TableTh.module.css';

export enum ThType {
  Title = 1,
  Number
}

export type TableThProps = {
  type?: ThType,
}

const TableTh: FunctionComponent<TableThProps> = ({ 
  children ,
  type = ThType.Number
}) => {
  return (
    <th className={`${styles['th']} ${getClassNameFromType(type)}`}>
      {children}
    </th>
  );
}

function getClassNameFromType(type: ThType): string {
  if (type === ThType.Title) {
    return styles['th-title'];
  }
  if (type === ThType.Number) {
    return styles['th-number'];
  }
  return styles['th-title'];
}

export default TableTh;