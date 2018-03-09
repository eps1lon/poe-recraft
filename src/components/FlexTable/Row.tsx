import * as React from 'react';

import { Column } from './props';
import Cell from './Cell';

export interface Props<T> {
  className?: string;
  columns: Column<T>[];
  data: T;
}

export default class Table<T> extends React.PureComponent<Props<T>> {
  render() {
    const { className, columns, data } = this.props;
    return (
      <div className="flex-table-row">
        {columns.map(col => (
          <Cell
            key={col.id}
            className={col.className}
            data={data}
            renderItem={col.renderCell}
          />
        ))}
      </div>
    );
  }
}
