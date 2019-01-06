import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import * as React from 'react';

import Cell from './Cell';
import { Column } from './props';

export interface Props<T> {
  columns: Array<Column<T>>;
  onHeaderClick: (index: number) => void;
}
const styles = createStyles({
  root: {
    borderBottom: '1px solid grey',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '95%',
  },
  cell: {
    flexGrow: 0,
    fontWeight: 'bold',
  },
});
const useClasses = makeStyles(styles);

function Header<T>(props: Props<T>) {
  const { columns, onHeaderClick } = props;
  const classes = useClasses();

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

Header.defaultProps = {
  onHeaderClick: () => {},
};

export default React.memo(Header);
