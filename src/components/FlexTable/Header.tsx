import classnames from 'classnames';
import * as React from 'react';

import Cell from './Cell';
import { Column } from './props';

export interface Props<T> {
  columns: Array<Column<T>>;
  onHeaderClick?: (index: number) => void;
}

export default class Header<T> extends React.PureComponent<Props<T>> {
  public static defaultProps = {
    onHeaderClick: () => {}
  };

  public render() {
    const { columns, onHeaderClick } = this.props as Props<T> &
      typeof Header.defaultProps;
    return (
      <div className="flex-table-head flex-table-row">
        {columns.map((col, index) => (
          <Cell
            key={col.id}
            className={col.className}
            data={undefined}
            index={index}
            onClick={onHeaderClick}
            renderItem={col.renderHeader}
          />
        ))}
      </div>
    );
  }
}
