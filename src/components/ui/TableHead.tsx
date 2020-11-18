import React, { FunctionComponent } from 'react';

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