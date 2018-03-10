import * as React from 'react';
import classnames from 'classnames';

import { Column } from './props';
import Cell from './Cell';

export interface Props<T> {
  columns: Column<T>[];
  onHeaderClick?: (col: Column<T>, index: number) => any;
}

export default class Table<T> extends React.PureComponent<Props<T>> {
  public static defaultProps = {
    onHeaderClick: () => undefined
  };

  render() {
    const { columns, onHeaderClick } = this.props as Props<T> &
      typeof Table.defaultProps;
    return (
      <div className="flex-table-head flex-table-row">
        {columns.map((col, index) => (
          <div
            onClick={() => onHeaderClick(col, index)}
            className={classnames('flex-table-cell', col.className)}
          >
            {col.renderHeader()}
          </div>
        ))}
      </div>
    );
  }
}
