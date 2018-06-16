import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import LineContent from './LineContent';
import { Intersperse } from '../../../../util/react';

export interface Props {
  requirements: Array<LineContent['props']>;
}

const commaSeparator = () => ', ';

export default class Lines extends React.PureComponent<Props> {
  public render() {
    const { requirements } = this.props;
    return (
      <div className="requirements">
        <span className="lc">
          <FormattedMessage id="poe.api.Requires" defaultMessage="Requires" />{' '}
          <Intersperse renderSeparator={commaSeparator}>
            {requirements.map((line, index) => (
              <LineContent key={index} {...line} />
            ))}
          </Intersperse>
        </span>
      </div>
    );
  }
}
