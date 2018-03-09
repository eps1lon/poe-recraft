import * as React from 'react';
import * as classnames from 'classnames';

import { Column } from './props';
import Header from './Header';
import Row from './Row';

export interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

export default class Table<T> extends React.PureComponent<Props<T>> {
  render() {
    const { columns, data } = this.props;
    return (
      <div className="flex-table">
        <Header columns={columns} />
        {data.map((row, i) => <Row key={i} data={row} columns={columns} />)}
      </div>
    );
  }
}
