import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';

import Cell from './Cell';
import { Column } from './props';

export interface Props<T> {
  columns: Array<Column<T>>;
  onHeaderClick: (index: number) => void;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginBottom: 1,
      width: '95%',
    },
    cell: {
      ...theme.typography.subtitle1,
      flexGrow: 0,
      fontWeight: 'bold',
      paddingLeft: 1,
      paddingRight: 1,
    },
  });
const useClasses = makeStyles(styles, { name: 'FlexTableHeader' });

function Header<T>(props: Props<T>) {
  const { columns, onHeaderClick } = props;
  const classes = useClasses({});

  return (
    <div className={classes.root}>
      {columns.map((col, index) => (
        <Cell
          key={col.id}
          className={classNames(classes.cell, col.className)}
          data={undefined}
          index={index}
          onClick={onHeaderClick}
          renderItem={col.renderHeader}
        />
      ))}
    </div>
  );
}

export default React.memo(Header);
