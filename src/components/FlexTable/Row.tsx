import * as React from 'react';
import classnames from 'classnames';

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
      <div className={classnames('flex-table-row', className)}>
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
