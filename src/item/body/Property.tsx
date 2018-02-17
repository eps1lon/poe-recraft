import classnames from 'classnames';
import * as React from 'react';

import PropertyValue, { DisplayPropertyType } from './PropertyValue';

export interface Props {
  human: string;
  value?: string;
  type?: DisplayPropertyType;
}

export default class Body extends React.PureComponent<Props> {
  render() {
    const { human, value, type = DisplayPropertyType.default } = this.props;

    return (
      <div className="display-property">
        <span>{human}</span>
        {value && <PropertyValue value={value} type={type} />}
      </div>
    );
  }
}
