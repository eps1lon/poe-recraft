import * as React from 'react';

import LineContent from './LineContent';

export interface Props {
  properties: LineContent['props'][];
}

export default class Lines extends React.PureComponent<Props> {
  render() {
    const { properties } = this.props;
    return this.props.properties
      .sort((a, b) => (a.type || 0) - (b.type || 0))
      .map((line, index) => (
        <div className="displayProperty">
          <span className="lc">
            <LineContent key={index} {...line} />
          </span>
        </div>
      ));
  }
}
