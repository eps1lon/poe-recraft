import * as React from 'react';

export interface Props {}

export default class Stats extends React.PureComponent<Props> {
  render() {
    return (
      <div className="unmet">
        <span className="lc">Corrupted</span>
      </div>
    );
  }
}
