import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

export interface Props<T> {
  className?: string;
  data: T;
  index: number;
  onClick?: (index: number) => void;
  renderItem: (data: T) => React.ReactNode;
}

export default class Cell<T> extends React.PureComponent<Props<T>> {
  public static defaultProps = {
    onClick: () => {},
  };

  public render() {
    const { className, data, renderItem } = this.props;
    return (
      <Typography
        className={classnames('flex-table-cell', className)}
        onClick={this.handleClick}
      >
        {renderItem(data)}
      </Typography>
    );
  }

  private handleClick = () => {
    const { index, onClick = Cell.defaultProps.onClick } = this.props;
    onClick(index);
  };
}
