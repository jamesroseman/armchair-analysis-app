import React, { CSSProperties, FunctionComponent } from 'react';
import styles from './TableTd.module.css';

export enum TdType {
  Title = 1,
  LeftImg,
  Number
}

export type TableTdProps = {
  properties?: CSSProperties,
  type?: TdType,
  checkmark?: boolean
}

const TableTd: FunctionComponent<TableTdProps> = ({ 
  children, 
  properties,
  type = TdType.Title,
  checkmark = false
}) => {
  return (
    <td 
      className={`${styles['td']} ${getClassNameFromType(type)} ${getClassNameFromCheckmark(checkmark)}`}
      style={properties}
    >
      {children}
    </td>
  );
}

function getClassNameFromType(type: TdType): string {
  if (type === TdType.Title) {
    return styles['td-title'];
  }
  if (type === TdType.LeftImg) {
    return styles['td-left-img'];
  }
  if (type === TdType.Number) {
    return styles['td-number'];
  }
  return styles['td-title'];
}

function getClassNameFromCheckmark(checkmark: boolean): string {
  if (checkmark) {
    return styles['checkmark'];
  }
  return styles['no-checkmark'];
}

export default TableTd;