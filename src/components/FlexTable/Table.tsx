import * as React from 'react';
import * as classnames from 'classnames';

import { Column } from './props';
import Header from './Header';
import Row, { Props as RowProps } from './Row';

export interface Props<T> {
  columns: Array<Column<T>>;
  data: T[];
  getTrProps: (data: T) => Partial<Pick<RowProps<T>, 'className'>>;
}

export interface State {
  sortColumn: number;
  sortOrder: 'asc' | 'desc';
}

export default class Table<T> extends React.PureComponent<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      sortColumn: props.columns.findIndex(({ sortBy }) => sortBy !== undefined),
      sortOrder: 'desc'
    };
  }

  render() {
    const { columns, data, getTrProps } = this.props;
    const { sortColumn, sortOrder } = this.state;

    let sorted_data = data;
    if (columns[sortColumn] !== undefined) {
      const { sortBy } = columns[sortColumn];
      if (sortBy !== undefined) {
        sorted_data = data.sort(createSortFnNumberic(sortBy, sortOrder));
      }
    }

    return (
      <div className="flex-table">
        <Header
          columns={columns}
          onHeaderClick={(_, i) =>
            this.setState({
              sortColumn: i,
              sortOrder: invertOrder(sortOrder)
            })
          }
        />
        {sorted_data.map((row, i) => (
          <Row key={i} data={row} columns={columns} {...getTrProps(row)} />
        ))}
      </div>
    );
  }
}

function invertOrder(order: 'asc' | 'desc'): 'asc' | 'desc' {
  return order === 'desc' ? 'asc' : 'desc';
}

function createSortFnNumberic<T>(
  get: (item: T) => number,
  order: 'asc' | 'desc'
) {
  return createSortFn(get, (a, b) => a - b, order);
}

function createSortFn<T, V>(
  get: (item: T) => V,
  compare: (a: V, b: V) => number,
  order: 'asc' | 'desc'
) {
  if (order === 'asc') {
    return (a: T, b: T) => compare(get(a), get(b));
  } else {
    return (a: T, b: T) => -compare(get(a), get(b));
  }
}
