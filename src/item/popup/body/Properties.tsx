import * as React from 'react';

import Property, { Props as PropertyProps } from './Property';
import PropertyValue, { DisplayPropertyType } from './PropertyValue';
import {
  WeaponProperties,
  ArmourProperties,
  NoProperties,
  ShieldProperties,
} from '../../poe';
import { round, msToPerSecond, asPercentString } from '../../../util/number';
import {
  AugmentableValue,
  augmentableNotZero,
  toString as valueToString,
  isZero,
} from '../../../util/value';

export interface Props {
  properties:
    | ArmourProperties
    | ShieldProperties
    | WeaponProperties
    | NoProperties;
}

export default class Properties extends React.PureComponent<Props> {
  public static hasAny(properties: Props['properties']) {
    if (properties.quality !== undefined && properties.quality > 0) {
      return true;
    }

    switch (properties.kind) {
      case 'armour':
        const { armour, energy_shield, evasion } = properties;
        return (
          augmentableNotZero(armour) ||
          augmentableNotZero(energy_shield) ||
          augmentableNotZero(evasion)
        );
      case 'weapon':
        // at least display weapon type
        return true;
      case 'none':
      case undefined:
        return false;
      default:
        // while the exhaustiveness check is nice for internal use
        // it's not guarenteed at runtime since this component can be consumed
        // by normal js
        // @ts-ignore
        throw new Error(`unrecognized property kind '${properties.kind}'`);
    }
  }

  public render() {
    return this.itemProperties();
  }

  private itemProperties(): JSX.Element[] {
    const { properties } = this.props;

    const display_properties = [];

    if (properties.quality !== undefined && properties.quality > 0) {
      display_properties.push(
        <Property key="quality" human="quality">
          <PropertyValue
            type={DisplayPropertyType.augmented}
            value={`${properties.quality}%`}
          />
        </Property>,
      );
    }

    switch (properties.kind) {
      case 'armour':
        display_properties.push(...this.armourProperties(properties));
        break;
      case 'weapon':
        display_properties.push(...this.weaponProperties(properties));
        break;
      case 'none':
      case undefined:
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

  private weaponProperties(props: WeaponProperties): JSX.Element[] {
    const displayed: JSX.Element[] = [];

    if (augmentableNotZero(props.physical_damage)) {
      displayed.push(
        <Property key="phys" human="physical damage">
          <PropertyValue
            type={
              props.physical_damage.augmented
                ? DisplayPropertyType.augmented
                : DisplayPropertyType.default
            }
            value={`${valueToString(props.physical_damage.value)}`}
          />
        </Property>,
      );
    }

    const elementals: JSX.Element[] = [];
    // cold
    if (props.cold_damage !== undefined && !isZero(props.cold_damage)) {
      elementals.push(
        <PropertyValue
          key="cold"
          type={DisplayPropertyType.cold_damage}
          value={`${valueToString(props.cold_damage)}`}
        />,
      );
    }
    // fire
    if (props.fire_damage !== undefined && !isZero(props.fire_damage)) {
      elementals.push(
        <PropertyValue
          key="fire"
          type={DisplayPropertyType.fire_damage}
          value={`${valueToString(props.fire_damage)}`}
        />,
      );
    }
    // lightning
    if (
      props.lightning_damage !== undefined &&
      !isZero(props.lightning_damage)
    ) {
      elementals.push(
        <PropertyValue
          key="lightning"
          type={DisplayPropertyType.lightning_damage}
          value={`${valueToString(props.lightning_damage)}`}
        />,
      );
    }
    // elementals
    if (elementals.length > 0) {
      displayed.push(
        <Property key="elemental" human="elemental damage">
          {elementals}
        </Property>,
      );
    }

    if (props.chaos_damage !== undefined && !isZero(props.chaos_damage)) {
      displayed.push(
        <Property key="chaos" human="chaos damage">
          <PropertyValue
            type={DisplayPropertyType.chaos_damage}
            value={`${valueToString(props.chaos_damage)}`}
          />
        </Property>,
      );
    }

    if (augmentableNotZero(props.crit)) {
      displayed.push(
        <Property key="crit" human="critical strike chance">
          <PropertyValue
            type={
              props.crit.augmented
                ? DisplayPropertyType.augmented
                : DisplayPropertyType.default
            }
            value={`${asPercentString(props.crit.value, 2)}%`}
          />
        </Property>,
      );
    }

    if (augmentableNotZero(props.attack_time)) {
      displayed.push(
        <Property key="aps" human="attacks per second">
          <PropertyValue
            type={
              props.attack_time.augmented
                ? DisplayPropertyType.augmented
                : DisplayPropertyType.default
            }
            value={`${msToPerSecond(props.attack_time.value, 2)}%`}
          />
        </Property>,
      );
    }

    return displayed;
  }

  private armourProperties(
    props: ArmourProperties | ShieldProperties,
  ): JSX.Element[] {
    const displayed: JSX.Element[] = [];

    const defences: Array<['armour' | 'energy_shield' | 'evasion', string]> = [
      ['armour', 'armour'],
      ['energy_shield', 'energy shield'],
      ['evasion', 'evasion'],
    ];

    defences.forEach(([key, human]) => {
      const prop = props[key];

      if (augmentableNotZero(prop)) {
        displayed.push(
          <Property key={key} human={human}>
            <PropertyValue
              type={
                prop.augmented
                  ? DisplayPropertyType.augmented
                  : DisplayPropertyType.default
              }
              value={String(round(prop.value))}
            />
          </Property>,
        );
      }
    });

    if ('block' in props && augmentableNotZero(props.block)) {
      displayed.push(
        <Property key="block" human="chance to block">
          <PropertyValue
            type={
              props.block.augmented
                ? DisplayPropertyType.augmented
                : DisplayPropertyType.default
            }
            value={`${round(props.block.value)}%`}
          />
        </Property>,
      );
    }

    return displayed;
  }
}
