import * as React from 'react';

import { Stat as StatProps } from './poe';
import Stat from './Stat';

export interface Props {
  classname: string;
}

export default class Stats extends React.PureComponent<Props> {
  public static hasAny(children: React.ReactNode[]) {
    // any displayable?
    return children.some(node => node != null);
  }

  public render() {
    const { classname, children } = this.props;

    if (Array.isArray(children)) {
      return children.map((child, i) => (
        <Stat key={i} classname={classname}>
          {child}
        </Stat>
      ));
    } else {
      return null;
    }
  }
}
