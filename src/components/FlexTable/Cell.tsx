import * as React from 'react';
import classnames from 'classnames';

export interface Props<T> {
  className?: string;
  data: T;
  renderItem: (data: T) => React.ReactNode;
}

export default class Cell<T> extends React.PureComponent<Props<T>> {
  render() {
    const { className, data, renderItem } = this.props;
    return (
      <div className={classnames('flex-table-cell', className)}>
        {renderItem(data)}
      </div>
    );
  }
}
