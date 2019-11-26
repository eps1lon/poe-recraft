import classnames from 'classnames';
import * as React from 'react';

import FrameType from '../../FrameType';

export interface Props {
  item: {
    name?: string;
    typeLine: React.ReactNode;
    frameType: FrameType;
    elder?: boolean;
    shaper?: boolean;
  };
}

export default class Head extends React.PureComponent<Props> {
  public render() {
    const { item } = this.props;
    const double_line = item.name != null && item.name.length > 0;

    return (
      <header
        className={classnames({
          'double-line': double_line,
          shaper: Boolean(item.shaper),
          elder: Boolean(item.elder),
        })}
      >
        <span className="name-left" />
        {double_line && (
          <div className="item-name">
            <span className="lc">{item.name}</span>
          </div>
        )}
        <div className="item-name typeLine">
          <span className="lc">{item.typeLine}</span>
        </div>
        <span className="name-right" />
      </header>
    );
  }
}
