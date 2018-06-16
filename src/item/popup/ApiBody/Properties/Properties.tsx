import * as React from 'react';

import LineContent from './LineContent';

export interface Props {
  properties: Array<LineContent['props']>;
}

export default class Properties extends React.PureComponent<Props> {
  public render() {
    const { properties } = this.props;
    return properties
      .sort((a, b) => (a.type || 0) - (b.type || 0))
      .map((line, index) => (
        <div key={index} className="displayProperty">
          <span className="lc">
            <LineContent {...line} />
          </span>
        </div>
      ));
  }
}
