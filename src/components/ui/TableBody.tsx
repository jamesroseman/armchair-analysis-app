import React, { FunctionComponent } from 'react';

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