import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import Header from './Header';
import { Column } from './props';
import Row, { Props as RowProps } from './Row';

export interface Props<T> {
  columns: Array<Column<T>>;
  data: T[];
  getTrProps: (data: T) => Partial<Pick<RowProps<T>, 'className'>>;
  sortColumn: number;
  sortOrder: 'asc' | 'desc';
  onSortChange: (index: number, newOrder: 'asc' | 'desc') => void;
}

const styles = createStyles({
  root: {
    marginLeft: 1,
    backgroundColor: '#000001',
  },
});
const useClasses = makeStyles(styles);

function Table<T>(props: Props<T>) {
  const {
    columns,
    data,
    getTrProps,
    onSortChange,
    sortColumn,
    sortOrder,
  } = props;

  const classes = useClasses();

  const handleHeaderClick = React.useCallback(
    (index: number) => {
      onSortChange(index, invertOrder(sortOrder));
    },
    [onSortChange, sortOrder],
  );

  let sorted_data = data;
  if (columns[sortColumn] !== undefined) {
    const { sortBy } = columns[sortColumn];
    if (sortBy !== undefined) {
      sorted_data = data.sort(createSortFnNumberic(sortBy, sortOrder));
    }
  }

  return (
    <div className={classes.root}>
      <Header columns={columns} onHeaderClick={handleHeaderClick} />
      {sorted_data.map((row, i) => (
        <Row key={i} data={row} columns={columns as any} {...getTrProps(row)} />
      ))}
    </div>
  );
}

Table.defaultProps = {
  sortColumn: -1,
  sortOrder: 'asc',
};

export default React.memo(Table);

function invertOrder(order: 'asc' | 'desc'): 'asc' | 'desc' {
  return order === 'desc' ? 'asc' : 'desc';
}

function createSortFnNumberic<T>(
  get: (item: T) => number,
  order: 'asc' | 'desc',
) {
  return createSortFn(get, (a, b) => a - b, order);
}

function createSortFn<T, V>(
  get: (item: T) => V,
  compare: (a: V, b: V) => number,
  order: 'asc' | 'desc',
) {
  if (order === 'asc') {
    return (a: T, b: T) => compare(get(a), get(b));
  } else {
    return (a: T, b: T) => -compare(get(a), get(b));
  }
}
