import * as React from 'react';

export enum DisplayPropertyType {
  simple,
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
  public render() {
    const { value, type } = this.props;

    return <span className={DisplayPropertyType[type]}>{value}</span>;
  }
}
