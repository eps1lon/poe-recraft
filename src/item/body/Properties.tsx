import * as React from 'react';

import Property, { Props as PropertyProps } from './Property';
import { DisplayPropertyType } from './PropertyValue';
import {
  WeaponProperties,
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
    | WeaponProperties
    | NoProperties;
}

export default class Properties extends React.PureComponent<Props> {
  public render() {
    return this.itemProperties().map(property => <Property {...property} />);
  }

  private itemProperties(): PropertyProps[] {
    const { properties } = this.props;

    const display_properties: PropertyProps[] = [];

    if (properties.quality !== undefined && properties.quality > 0) {
      display_properties.push({
        human: 'quality',
        type: DisplayPropertyType.augmented,
        value: `${round(properties.quality)}%`,
      });
    }

    switch (properties.kind) {
      case 'armour':
        display_properties.push(...this.armourProperties(properties));
        break;
      case 'weapon':
        display_properties.push(...this.weaponProperties(properties));
        break;
      case 'none':
        break;
      default:
        // while the exhaustiveness check is nice for internal use
        // it's not guarenteed at runtime since this component can be consumed
        // by normal js
        // @ts-ignore
        throw new Error(`unrecognized property kind '${properties.kind}'`);
    }

    return display_properties;
  }

  private weaponProperties(props: WeaponProperties): PropertyProps[] {
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
