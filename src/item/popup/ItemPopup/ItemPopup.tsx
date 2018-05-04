import * as classnames from 'classnames';
import * as React from 'react';
import { Omit } from 'utility-types';

import * as props from './props';
import ApiPopup from '../ApiPopup';
import FrameType from '../../FrameType';
import { Mod, isMod } from '../../../mod/poe';
import {
  minMaxToString,
  rollableToString,
  augmentableNotZero,
  valueNotZero,
} from '../../../util/value';
import { round, asPercentString } from '../../../util/number';

export type ApiProps = ApiPopup['props'];

// requirements below that threshold will not be displayed
const MIN_ATTRIBUTE_REQUIREMENTS = 14;

// otherwise ts merges item props => Props.item = ApiProps.item & props.Item
export type Props = Omit<ApiProps, 'item'> & {
  item: props.Item;
};

/**
 * HOC that simply maps our own Item interface to the interface thats used
 * by offical APIs provided by GGG
 *
 * We created our own because the offical interface mixes properties that
 * describe what is displayed with properties that describe how it is displayed
 * our own interface aims at properties that only displays what is displayed.
 * See also Model vs. View
 */
export default class ItemPopup extends React.PureComponent<Props> {
  public static assertValidProps(
    item: props.Item,
    onError: (err: string) => void,
  ) {
    if (item.name === undefined && item.rarity === props.Rarity.rare) {
      onError('rare items need a name in addition to the name of the baseitem');
    }

    if (item.elder && item.shaper) {
      onError('item can either be shaped or elder item but not both');
    }
  }

  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      ItemPopup.assertValidProps(props.item, console.warn);
    }
  }

  public render() {
    const { item, ...props } = this.props;

    return <ApiPopup item={this.toApiProps(item)} {...props} />;
  }

  private toApiProps(item: props.Item): ApiProps['item'] {
    return {
      corrupted: false, // TODO
      name: item.name,
      typeLine: this.typeLine(item),
      frameType: this.frameType(item),
      identified: true,
      elder: item.elder,
      shaper: item.shaper,
      properties: this.apiProperties(item),
      requirements: this.apiRequirements(item),
      category: this.apiCategory(item),
      craftedMods: item.craftedStats,
      enchantMods: item.enchantStats,
      explicitMods: item.explicitStats,
      implicitMods: item.implicitStats,
      utilityMods: item.utilityStats,
    };
  }

  private apiCategory(item: props.Item): ApiProps['item']['category'] {
    return {}; // TODO: requires extendet baseitem interface
  }

  private apiProperties(item: props.Item): ApiProps['item']['properties'] {
    const properties: ApiProps['item']['properties'] = [];
    const { quality } = item;

    if (valueNotZero(quality)) {
      properties.push({
        name: 'Quality',
        values: [[`${quality}%`, 1]],
        displayMode: 0,
      });
    }

    if (props.isArmourProperties(item)) {
      properties.push(...(this.apiArmourProperties(item) || []));
    } else if (props.isWeaponProperties(item)) {
      properties.push(...(this.apiWeaponProperties(item) || []));
    }

    return properties;
  }

  private apiArmourProperties(
    armour: props.ArmourProperties,
  ): ApiProps['item']['properties'] {
    const properties: ApiProps['item']['properties'] = [];
    const defences: Array<['armour' | 'energy_shield' | 'evasion', string]> = [
      ['armour', 'armour'],
      ['energy_shield', 'energy shield'],
      ['evasion', 'evasion'],
    ];

    defences.forEach(([key, human]) => {
      const prop = armour[key];
      if (augmentableNotZero(prop)) {
        properties.push({
          name: human,
          values: [[rollableToString(prop.value), prop.augmented ? 1 : 0]],
          displayMode: 0,
        });
      }
    });

    if (props.isShieldProperties(armour)) {
      const { block } = armour;
      if (augmentableNotZero(block)) {
        properties.push({
          name: 'Block',
          values: [
            [`${rollableToString(block.value)}%`, block.augmented ? 1 : 0],
          ],
          displayMode: 0,
        });
      }
    }

    return properties;
  }

  private apiWeaponProperties(
    weapon: props.WeaponProperties,
  ): ApiProps['item']['properties'] {
    const properties: ApiProps['item']['properties'] = [];
    const {
      physical_damage,
      cold_damage,
      lightning_damage,
      fire_damage,
      chaos_damage,
      crit,
      aps,
      range,
    } = weapon;

    // Physical Damage
    if (augmentableNotZero(physical_damage)) {
      properties.push({
        name: 'Physical Damage',
        values: [
          [
            minMaxToString(physical_damage.value),
            physical_damage.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    // Elemental Damage
    const elemental_damage: [string, number][] = [];
    if (valueNotZero(fire_damage)) {
      elemental_damage.push([minMaxToString(fire_damage), 4]);
    }
    if (valueNotZero(cold_damage)) {
      elemental_damage.push([minMaxToString(cold_damage), 5]);
    }
    if (valueNotZero(lightning_damage)) {
      elemental_damage.push([minMaxToString(lightning_damage), 6]);
    }
    if (elemental_damage.length > 0) {
      properties.push({
        name: 'Elemental Damage',
        values: elemental_damage,
        displayMode: 0,
      });
    }

    // Chaos Damage
    if (valueNotZero(chaos_damage)) {
      properties.push({
        name: 'Chaos Damage',
        values: [[minMaxToString(chaos_damage), 7]],
        displayMode: 0,
      });
    }

    // Range
    if (augmentableNotZero(range)) {
      properties.push({
        name: 'Range',
        values: [[rollableToString(range.value), range.augmented ? 1 : 0]],
        displayMode: 0,
      });
    }

    // Crit
    if (augmentableNotZero(crit)) {
      properties.push({
        name: 'Critical Strike Chance',
        values: [
          [
            rollableToString(crit.value, n => asPercentString(n, 2)),
            crit.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    // APS
    if (augmentableNotZero(aps)) {
      properties.push({
        name: 'Attacks per Second',
        values: [
          [
            `${rollableToString(aps.value, n => (n / 100).toFixed(2))}`,
            aps.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    return properties;
  }

  private apiRequirements(item: props.Item): ApiProps['item']['requirements'] {
    const { requirements: item_requirements } = item;
    if (item_requirements === undefined) {
      return [];
    }

    const requirements: ApiProps['item']['requirements'] = [];
    const { level, dexterity, intelligence, strength } = item_requirements;

    if (augmentableNotZero(level)) {
      requirements.push({
        name: 'Level',
        values: [[rollableToString(level.value), level.augmented ? 1 : 0]],
        displayMode: 0,
      });
    }

    if (
      augmentableNotZero(dexterity) &&
      dexterity.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: 'Dex',
        values: [
          [rollableToString(dexterity.value), dexterity.augmented ? 1 : 0],
        ],
        displayMode: 1,
      });
    }

    if (
      augmentableNotZero(intelligence) &&
      intelligence.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: 'Int',
        values: [
          [
            rollableToString(intelligence.value),
            intelligence.augmented ? 1 : 0,
          ],
        ],
        displayMode: 1,
      });
    }

    if (
      augmentableNotZero(strength) &&
      strength.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: 'Str',
        values: [
          [rollableToString(strength.value), strength.augmented ? 1 : 0],
        ],
        displayMode: 1,
      });
    }

    return requirements;
  }

  private typeLine(item: props.Item): ApiProps['item']['typeLine'] {
    if (item.rarity === props.Rarity.magic) {
      return [item.prefix, item.base.name, item.suffix]
        .filter(s => typeof s === 'string' && s.length > 0)
        .join(' ');
    } else {
      return item.base.name;
    }
  }

  private frameType(item: props.Item): FrameType {
    switch (item.rarity) {
      case props.Rarity.normal:
        return FrameType.normal;
      case props.Rarity.magic:
        return FrameType.magic;
      case props.Rarity.rare:
        return FrameType.rare;
      case props.Rarity.unique:
        return FrameType.unique;
    }
    throw new Error('could not determine frameType from item');
  }
}
