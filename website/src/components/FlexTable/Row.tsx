import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { Column } from './props';

export interface Props<T> {
  className?: string;
  columns: Array<Column<T>>;
  data: T;
}

const styles = createStyles({
  root: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 1,
    width: '95%',
  },
  cell: {
    flexGrow: 0,
    paddingLeft: 1,
    paddingRight: 1,
  },
});
const useClasses = makeStyles(styles);

function Row<T>(props: Props<T>) {
  const { columns, data } = props;
  const classes = useClasses({});

  return (
    <div className={classes.root}>
      {columns.map((col, index) => (
        <Cell
          key={col.id}
          className={classNames(classes.cell, col.className)}
          data={data}
          index={index}
          renderItem={col.renderCell}
        />
      ))}
    </div>
  );
}

export default React.memo(Row);
