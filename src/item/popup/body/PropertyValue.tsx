import classnames from 'classnames';
import * as React from 'react';

export enum DisplayPropertyType {
  default,
  augmented,
  chaos_damage,
  cold_damage,
  fire_damage,
  lightning_damage,
}

export interface Props {
  value: string;
  type: DisplayPropertyType;
}

export default class PropertyValue extends React.PureComponent<Props> {
  render() {
    const { value, type } = this.props;

    return (
      <span className={classnames('value', DisplayPropertyType[type])}>
        {value}
      </span>
    );
  }
}
