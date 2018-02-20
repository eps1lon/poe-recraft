import classnames from 'classnames';
import * as React from 'react';

import PropertyValue, { DisplayPropertyType } from './PropertyValue';
import { intersperse, CommaSeparator } from '../../../util/react';

export interface Props {
  human: string;
}

export default class Property extends React.PureComponent<Props> {
  render() {
    const { human, children } = this.props;

    return (
      <div className="display-property">
        <span>{human}</span>
        {children && [
          ': ',
          ...intersperse(
            Array.isArray(children) ? children : [children],
            CommaSeparator,
          ),
        ]}
      </div>
    );
  }
}
