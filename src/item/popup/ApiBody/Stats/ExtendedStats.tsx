import * as React from 'react';

import Extended, { ModGroup } from './Extended';
import ExtendedStat from './ExtendedStat';

export interface Props {
  className: string;
  extended: Extended;
  group: ModGroup;
}

export interface State {
  hovered_stat: number;
}

export default class ExtendedStats extends React.PureComponent<Props, State> {
  public state: State = {
    hovered_stat: -1,
  };

  public render() {
    const { className, children, extended, group } = this.props;

    if (!Array.isArray(children)) {
      return children;
    }

    return children.map((stat, index) => (
      <ExtendedStat
        key={index}
        className={className}
        extended={extended}
        group={group}
        index={index}
        showInfo={this.isHovered(index)}
      >
        {stat}
      </ExtendedStat>
    ));
  }

  private isHovered(index: number): boolean {
    return this.state.hovered_stat === index;
  }
}
