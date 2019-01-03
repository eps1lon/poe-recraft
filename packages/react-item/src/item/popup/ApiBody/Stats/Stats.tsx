import * as React from 'react';

import SimpleStats from './SimpleStats';
import ExtendedStats from './ExtendedStats';
import Extended, { ModGroup } from './Extended';

export interface Props {
  className: string;
  extended?: Extended;
  group: ModGroup;
}

export default class Stats extends React.PureComponent<Props> {
  public render() {
    const { extended, group, ...props } = this.props;

    if (extended == null) {
      return <SimpleStats {...props} />;
    } else {
      return <ExtendedStats extended={extended} group={group} {...props} />;
    }
  }
}
