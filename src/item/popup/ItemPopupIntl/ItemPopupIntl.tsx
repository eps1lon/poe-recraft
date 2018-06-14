import * as classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Omit } from 'utility-types';

import * as props from './props';
import TypeLineIntl from './TypeLineIntl';
import ApiPopupIntl from '../ApiPopupIntl';
import FrameType from '../../FrameType';
import {
  minMaxToString,
  rollableToString,
  augmentableNotZero,
  valueNotZero,
} from '../../../util/value';
import { round, asPercentString } from '../../../util/number';

export type ApiProps = PropsType<typeof ApiPopupIntl>;

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
export default class ItemPopupIntl extends React.PureComponent<Props> {
  public static assertValidProps(
    item: props.Item,
    onError: (err: string) => void,
  ) {
    if (item.name === undefined && item.rarity === 'rare') {
      onError('rare items need a name in addition to the name of the baseitem');
    }
    if (item.base.name === undefined && item.base.id === undefined) {
      onError(
        'You either have to provide an explicit basename or the id of the baseitem to enable i18n.',
      );
    }

    if (item.elder && item.shaper) {
      onError('item can either be shaped or elder item but not both');
    }
  }

  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      ItemPopupIntl.assertValidProps(props.item, console.warn);
    }
  }

  public render() {
    const { item, ...props } = this.props;

    return <ApiPopupIntl item={this.toApiProps(item)} {...props} />;
  }

  private toApiProps(item: props.Item): ApiProps['item'] {
    return {
      corrupted: item.corrupted,
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
        name: (
          <FormattedMessage id="poe.popup.quality" defaultMessage="Quality" />
        ),
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
    const defences: Array<
      ['armour' | 'energy_shield' | 'evasion', React.ReactNode]
    > = [
      [
        'armour',
        <FormattedMessage id="poe.popup.armour" defaultMessage="armour" />,
      ],
      [
        'energy_shield',
        <FormattedMessage
          id="poe.popup.energy_shield"
          defaultMessage="energy shield"
        />,
      ],
      [
        'evasion',
        <FormattedMessage id="poe.popup.evasion" defaultMessage="evasion" />,
      ],
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
          name: (
            <FormattedMessage id="poe.popup.block" defaultMessage="Block" />
          ),
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
        name: (
          <FormattedMessage
            id="poe.popup.physical_damage"
            defaultMessage="Physical Damage"
          />
        ),
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
        name: (
          <FormattedMessage
            id="poe.popup.elemental_damage"
            defaultMessage="Elemental Damage"
          />
        ),
        values: elemental_damage,
        displayMode: 0,
      });
    }

    // Chaos Damage
    if (valueNotZero(chaos_damage)) {
      properties.push({
        name: (
          <FormattedMessage
            id="poe.popup.chaos_damage"
            defaultMessage="Chaos Damage"
          />
        ),
        values: [[minMaxToString(chaos_damage), 7]],
        displayMode: 0,
      });
    }

    // Range
    if (augmentableNotZero(range)) {
      properties.push({
        name: <FormattedMessage id="poe.popup.range" defaultMessage="Range" />,
        values: [[rollableToString(range.value), range.augmented ? 1 : 0]],
        displayMode: 0,
      });
    }

    // Crit
    if (augmentableNotZero(crit)) {
      properties.push({
        name: (
          <FormattedMessage
            id="poe.popup.crit"
            defaultMessage="Critical Strike Chance"
          />
        ),
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
        name: (
          <FormattedMessage
            id="poe.popup.aps"
            defaultMessage="Attacks per Second"
          />
        ),
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
        name: <FormattedMessage id="poe.popup.requirements.level" defaultMessage="Level" />,
        values: [[rollableToString(level.value), level.augmented ? 1 : 0]],
        displayMode: 0,
      });
    }

    if (
      augmentableNotZero(dexterity) &&
      dexterity.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: (
          <FormattedMessage
            id="poe.popup.requirements.dex"
            defaultMessage="Dex"
          />
        ),
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
        name: (
          <FormattedMessage
            id="poe.popup.requirements.int"
            defaultMessage="Int"
          />
        ),
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
        name: (
          <FormattedMessage
            id="poe.popup.requirements.str"
            defaultMessage="Str"
          />
        ),
        values: [
          [rollableToString(strength.value), strength.augmented ? 1 : 0],
        ],
        displayMode: 1,
      });
    }

    return requirements;
  }

  private typeLine(item: props.Item): ApiProps['item']['typeLine'] {
    const { id, name } = item.base;
    const { prefix, suffix } = item;
    if (id != null) {
      return (
        <TypeLineIntl
          item_id={id}
          rarity={item.rarity}
          prefix_id={prefix}
          suffix_id={suffix}
        />
      );
    }
  }

  private frameType(item: props.Item): FrameType {
    switch (item.rarity) {
      case 'normal':
        return FrameType.normal;
      case 'magic':
        return FrameType.magic;
      case 'rare':
        return FrameType.rare;
      case 'unique':
        return FrameType.unique;
    }
    throw new Error('could not determine frameType from item');
  }
}
