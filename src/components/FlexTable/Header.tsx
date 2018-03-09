import * as React from 'react';
import classnames from 'classnames';

import { Column } from './props';
import Cell from './Cell';

export interface Props<T> {
  columns: Column<T>[];
}

export default class Table<T> extends React.PureComponent<Props<T>> {
  render() {
    const { columns } = this.props;
    return (
      <div className="flex-table-head flex-table-row">
        {columns.map(col => (
          <div className={classnames('flex-table-cell', col.className)}>
            {col.renderHeader()}
          </div>
        ))}
      </div>
    );
  }
}
