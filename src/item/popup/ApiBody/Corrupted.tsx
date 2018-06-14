import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface Props {}

export default class Stats extends React.PureComponent<Props> {
  render() {
    return (
      <div className="unmet">
        <span className="lc">
          <FormattedMessage
            id="poe.popup.corrupted"
            defaultMessage="Corrupted"
          />
        </span>
      </div>
    );
  }
}
