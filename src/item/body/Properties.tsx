import * as React from 'react';

import Property, { Props as PropertyProps } from './Property';
import { DisplayPropertyType } from './PropertyValue';
import {
  WeaponProperies,
  ArmourProperties,
  NoProperties,
  ShieldProperties,
  AugmentableValue,
} from '../poe';
import { round } from '../../util/number';

export interface Props {
  properties:
    | ArmourProperties
    | ShieldProperties
    | WeaponProperies
    | NoProperties;
}

export default class Properties extends React.PureComponent<Props> {
  public render() {
    return this.itemProperties().map(property => <Property {...property} />);
  }

  private itemProperties(): PropertyProps[] {
    const { properties } = this.props;
    switch (properties.kind) {
      case 'armour':
        return this.armourProperties(properties);
      case 'weapon':
        return this.weaponProperties(properties);
      case 'none':
        return [];
      default:
        // while the exhaustiveness check is nice for internal use
        // it's not guarenteed at runtime since this component can be consumed
        // by normal js
        // @ts-ignore
        throw new Error(`unrecognized property kind '${properties.kind}'`);
    }
  }

  private weaponProperties(props: WeaponProperies): PropertyProps[] {
    const displayed: PropertyProps[] = [];

    return displayed;
  }

  private armourProperties(
    props: ArmourProperties | ShieldProperties,
  ): PropertyProps[] {
    const displayed: PropertyProps[] = [];

    const defences: Array<['armour' | 'energy_shield' | 'evasion', string]> = [
      ['armour', 'armour'],
      ['energy_shield', 'energy shield'],
      ['evasion', 'evasion'],
    ];

    defences.forEach(([key, human]) => {
      const prop = props[key];
      if (prop !== undefined && prop.value > 0) {
        displayed.push({
          human,
          type: prop.augmented
            ? DisplayPropertyType.augmented
            : DisplayPropertyType.default,
          value: String(round(prop.value)),
        });
      }
    });

    if (
      'block' in props &&
      props.block !== undefined &&
      props.block.value > 0
    ) {
      displayed.push({
        human: 'chance to block',
        type: props.block.augmented
          ? DisplayPropertyType.augmented
          : DisplayPropertyType.default,
        value: `${round(props.block.value)}%`,
      });
    }

    return displayed;
  }
}
