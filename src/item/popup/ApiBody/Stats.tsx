import * as React from 'react';

export interface Props {
  className: string;
}

export default class Stats extends React.PureComponent<Props> {
  render() {
    const { className, children } = this.props;

    if (!Array.isArray(children)) {
      return children;
    }

    return children.map((stat, index) => (
      <div key={index} className={className}>
        <span className="lc">{stat}</span>
      </div>
    ));
  }
}
