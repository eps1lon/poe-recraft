import { formatValue } from 'poe-i18n';
import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Omit } from 'utility-types';

import * as ItemProps from './props';
import TypeLineIntl from './TypeLineIntl';
import ApiPopupIntl from '../ApiPopupIntl';
import FrameType from '../../FrameType';
import {
  minMaxToString,
  valueNotZero,
  augmentableNotZero,
  ROLLABLE_VALUE_MESSAGE,
} from '../../../util/value';
import { asPercentString } from '../../../util/number';

export type ApiProps = PropsType<typeof ApiPopupIntl>;

// requirements below that threshold will not be displayed
const MIN_ATTRIBUTE_REQUIREMENTS = 14;

// otherwise ts merges item props => Props.item = ApiProps.item & props.Item
export type Props = Omit<ApiProps, 'item'> & {
  item: ItemProps.Item;
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
class ItemPopupIntl extends React.PureComponent<Props & InjectedIntlProps> {
  public static assertValidProps(
    item: ItemProps.Item,
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

  constructor(props: Props & InjectedIntlProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      ItemPopupIntl.assertValidProps(props.item, console.warn);
    }
  }

  public render() {
    const { item, ...props } = this.props;

    return <ApiPopupIntl item={this.toApiProps(item)} {...props} />;
  }

  private toApiProps(item: ItemProps.Item): ApiProps['item'] {
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

  private apiCategory(item: ItemProps.Item): ApiProps['item']['category'] {
    return {}; // TODO: requires extendet baseitem interface
  }

  private apiProperties(item: ItemProps.Item): ApiProps['item']['properties'] {
    const properties: ApiProps['item']['properties'] = [];
    const { quality } = item;

    if (valueNotZero(quality)) {
      properties.push({
        name: (
          <FormattedMessage id="poe.api.Quality" defaultMessage="Quality" />
        ),
        values: [[`${quality}%`, 1]],
        displayMode: 0,
      });
    }

    if (ItemProps.isArmourProperties(item)) {
      properties.push(...(this.apiArmourProperties(item) || []));
    } else if (ItemProps.isWeaponProperties(item)) {
      properties.push(...(this.apiWeaponProperties(item) || []));
    }

    return properties;
  }

  private apiArmourProperties(
    armour: ItemProps.ArmourProperties,
  ): ApiProps['item']['properties'] {
    const properties: ApiProps['item']['properties'] = [];
    const defences: Array<
      ['armour' | 'energy_shield' | 'evasion', React.ReactNode]
    > = [
      [
        'armour',
        <FormattedMessage
          key="msg"
          id="poe.api.Armour"
          defaultMessage="armour"
        />,
      ],
      [
        'energy_shield',
        <FormattedMessage
          key="msg"
          id="poe.api.Energy Shield"
          defaultMessage="energy shield"
        />,
      ],
      [
        'evasion',
        <FormattedMessage
          key="msg"
          id="poe.api.Evasion"
          defaultMessage="evasion"
        />,
      ],
    ];

    defences.forEach(([key, human]) => {
      const prop = armour[key];
      if (augmentableNotZero(prop)) {
        properties.push({
          name: human,
          values: [
            [
              formatValue(prop.value, { message: ROLLABLE_VALUE_MESSAGE }),
              prop.augmented ? 1 : 0,
            ],
          ],
          displayMode: 0,
        });
      }
    });

    if (ItemProps.isShieldProperties(armour)) {
      const { block } = armour;
      if (augmentableNotZero(block)) {
        properties.push({
          name: <FormattedMessage id="poe.api.Block" defaultMessage="Block" />,
          values: [
            [
              formatValue(block.value, {
                message: `${ROLLABLE_VALUE_MESSAGE}%`,
              }),
              block.augmented ? 1 : 0,
            ],
          ],
          displayMode: 0,
        });
      }
    }

    return properties;
  }

  private apiWeaponProperties(
    weapon: ItemProps.WeaponProperties,
  ): ApiProps['item']['properties'] {
    const { intl: { formatMessage } } = this.props;
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
            id="poe.api.Physical Damage"
            defaultMessage="Physical Damage"
          />
        ),
        values: [
          [
            minMaxToString(physical_damage.value, formatMessage),
            physical_damage.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    // Elemental Damage
    const elemental_damage: Array<[string, number]> = [];
    if (valueNotZero(fire_damage)) {
      elemental_damage.push([minMaxToString(fire_damage, formatMessage), 4]);
    }
    if (valueNotZero(cold_damage)) {
      elemental_damage.push([minMaxToString(cold_damage, formatMessage), 5]);
    }
    if (valueNotZero(lightning_damage)) {
      elemental_damage.push([
        minMaxToString(lightning_damage, formatMessage),
        6,
      ]);
    }
    if (elemental_damage.length > 0) {
      properties.push({
        name: (
          <FormattedMessage
            id="poe.api.Elemental Damage"
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
            id="poe.api.Chaos Damage"
            defaultMessage="Chaos Damage"
          />
        ),
        values: [[minMaxToString(chaos_damage, formatMessage), 7]],
        displayMode: 0,
      });
    }

    // Range
    if (augmentableNotZero(range)) {
      properties.push({
        name: (
          <FormattedMessage
            id="poe.api.Weapon Range"
            defaultMessage="Weapon Range"
          />
        ),
        values: [
          [
            formatValue(range.value, {
              message: ROLLABLE_VALUE_MESSAGE,
            }),
            range.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    // Crit
    if (augmentableNotZero(crit)) {
      properties.push({
        name: (
          <FormattedMessage
            id="poe.api.Critical Strike Chance"
            defaultMessage="Critical Strike Chance"
          />
        ),
        values: [
          [
            formatValue(crit.value, {
              message: ROLLABLE_VALUE_MESSAGE,
              formatter: {
                id: 'divide_by_one_hundred_2dp',
                arg: 1,
              },
            }),
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
            id="poe.api.Attacks per Second"
            defaultMessage="Attacks per Second"
          />
        ),
        values: [
          [
            formatValue(aps.value, {
              message: ROLLABLE_VALUE_MESSAGE,
              formatter: {
                id: 'divide_by_one_hundred_2dp',
                arg: 1,
              },
            }),
            aps.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    return properties;
  }

  private apiRequirements(
    item: ItemProps.Item,
  ): ApiProps['item']['requirements'] {
    const { requirements: item_requirements } = item;
    if (item_requirements === undefined) {
      return [];
    }

    const requirements: ApiProps['item']['requirements'] = [];
    const { level, dexterity, intelligence, strength } = item_requirements;

    if (augmentableNotZero(level)) {
      requirements.push({
        name: <FormattedMessage id="poe.api.Level" defaultMessage="Level" />,
        values: [
          [
            formatValue(level.value, {
              message: ROLLABLE_VALUE_MESSAGE,
            }),
            level.augmented ? 1 : 0,
          ],
        ],
        displayMode: 0,
      });
    }

    if (
      augmentableNotZero(dexterity) &&
      dexterity.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: <FormattedMessage id="poe.api.Dex" defaultMessage="Dex" />,
        values: [
          [
            formatValue(dexterity.value, {
              message: ROLLABLE_VALUE_MESSAGE,
            }),
            dexterity.augmented ? 1 : 0,
          ],
        ],
        displayMode: 1,
      });
    }

    if (
      augmentableNotZero(intelligence) &&
      intelligence.value > MIN_ATTRIBUTE_REQUIREMENTS
    ) {
      requirements.push({
        name: <FormattedMessage id="poe.api.Int" defaultMessage="Int" />,
        values: [
          [
            formatValue(intelligence.value, {
              message: ROLLABLE_VALUE_MESSAGE,
            }),
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
        name: <FormattedMessage id="poe.api.Str" defaultMessage="Str" />,
        values: [
          [
            formatValue(strength.value, {
              message: ROLLABLE_VALUE_MESSAGE,
            }),
            strength.augmented ? 1 : 0,
          ],
        ],
        displayMode: 1,
      });
    }

    return requirements;
  }

  private typeLine(item: ItemProps.Item): ApiProps['item']['typeLine'] {
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
    } else {
      return name;
    }
  }

  private frameType(item: ItemProps.Item): FrameType {
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

export default injectIntl(ItemPopupIntl);
