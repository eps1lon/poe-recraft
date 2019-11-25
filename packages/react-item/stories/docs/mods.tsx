import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Item,
  ArmourProperties,
  WeaponProperties,
  createItems,
  createMods,
  Container,
  SemanticSerializer as SemanticItemSerializer,
  Mod,
} from 'poe-mods';
import { Format } from 'poe-i18n';
// 'poe-components-item'
import { Popup } from '../../src/';
import { ImmutableContainer } from 'poe-mods/dist/cjs/containers';

const items = createItems(require('poe-mods/data/items/equipment.json'));
const mods = createMods([
  ...require('poe-mods/data/mods/prefixes.json'),
  ...require('poe-mods/data/mods/suffixes.json'),
]);
const i18n_descriptions = {
  stat_descriptions: require('poe-i18n/locale-data/en/stat_descriptions.json'),
};

const base_helmet: Item = items.fromId(
  'Metadata/Items/Armours/Helmets/HelmetInt11',
);
const helmet = base_helmet.rarity
  .set('rare')
  .asShaperItem()
  .properties.setQuality(5)
  .addMod(mods.fromId('IncreasedLife0'))
  .addMod(mods.fromId('LocalIncreasedEnergyShield2'))
  .addMod(mods.fromId('LocalIncreasedEnergyShieldPercentAndStunRecovery3'))
  .addMod(mods.fromId('FireResist1'))
  .addMod(mods.fromId('ReducedLocalAttributeRequirements1'))
  .addMod(mods.fromId('AdditionalMinesPlacedSupportedUber1_'));

const dagger: Item = items
  .fromId('Metadata/Items/Weapons/OneHandWeapons/Daggers/Dagger20')
  .rarity.set('rare')
  .asElderItem()
  .addMod(mods.fromId('LocalAddedChaosDamage1'))
  .addMod(mods.fromId('LocalIncreasedPhysicalDamagePercent7'))
  .addMod(mods.fromId('LocalAddedColdDamage1'))
  .addMod(mods.fromId('LocalIncreasedAttackSpeed8'))
  .addMod(mods.fromId('LocalCriticalStrikeChance5'))
  .setProperty('corrupted', true);

const snapshotProperties = (item: Item) => {
  const { properties } = item;
  const base_properties = {
    quality: properties.quality,
  };

  if (properties instanceof ArmourProperties) {
    return {
      ...base_properties,
      ...properties.defences(),
    };
  } else if (properties instanceof WeaponProperties) {
    const physical_damage = properties.physical_damage();
    const cold_damage = properties.cold_damage();

    return {
      ...base_properties,
      physical_damage: {
        augmented:
          physical_damage.min.augmented || physical_damage.max.augmented,
        value: asTuple2Unsafe([
          physical_damage.min.value,
          physical_damage.max.value,
        ]),
      },
      cold_damage: asTuple2Unsafe([
        cold_damage.min.value,
        cold_damage.max.value,
      ]),
      aps: properties.attack_speed(),
      crit: properties.crit(),
    };
  } else {
    return base_properties;
  }
};

const statsTranslated = (container: Container<any>, format: Format) => {
  return format.stats(
    Object.entries(container.stats()).map(([id, stat]) => {
      return {
        id,
        value: stat.values.valueOf(),
      };
    }),
  );
};

/**
 *
 * @param item {Item}
 */
const snapShotItem = (
  item: Item,
  format: Format,
): PropsType<typeof Popup>['item'] => {
  const {
    rarity,
    base,
    corrupted,
    elder,
    shaper,
    requirements,
    name,
  } = SemanticItemSerializer.serialize(item);

  return {
    rarity: rarity === 'showcase' ? 'rare' : rarity,
    base: {
      name: base.name,
    },
    name,
    elder,
    shaper,
    corrupted,
    requirements,
    implicitStats: statsTranslated(item.implicits, format),
    explicitStats: statsTranslated(item.affixes, format),
    ...snapshotProperties(item),
  };
};

const getTier = (mod: Mod): number => {
  const tier_match = mod.props.id.match(/(\d+)$/);
  if (tier_match == null) {
    return 1;
  } else {
    return +tier_match[1];
  }
};

const getTierText = (mod: Mod): string => {
  let prefix = '';
  if (mod.isPrefix()) {
    prefix = 'P';
  } else if (mod.isSuffix()) {
    prefix = 'S';
  }

  return `${prefix}${getTier(mod)}`;
};

const getExtendedModGroup = (container: ImmutableContainer<Mod, any>) => {
  const containerMods = container.mods;
  const stats = container.statsExtended();

  return {
    mods: containerMods.map(mod => {
      const tier = getTierText(mod);
      return {
        magnitudes: mod.statsJoined().map(stat => {
          return {
            hash: stat.id,
            min: stat.values.min,
            max: stat.values.max,
          };
        }),
        name: mod.props.name,
        tier,
      };
    }),
    hashes: stats.map(({ stat: { id }, mod_indices }) => {
      return [id, mod_indices] as [string, number[]];
    }),
  };
};

const getExtended = (item: Item): PropsType<typeof Popup>['extended'] => {
  const { mods: itemMods, hashes } = getExtendedModGroup(item.affixes);

  return {
    mods: { explicit: itemMods },
    hashes: { explicit: hashes },
  };
};

const global_format = new Format();
global_format.configure({ datas: i18n_descriptions });

storiesOf('poe-mods integration', module)
  .add('Helmet', () => (
    <Popup
      item={snapShotItem(helmet, global_format)}
      extended={getExtended(helmet)}
      width={500}
    />
  ))
  .add('Weapon', () => <Popup item={snapShotItem(dagger, global_format)} />);

/**
 * typecast array to tuple with no runtime checks
 * identity function!
 * @param list
 */
function asTuple2Unsafe<T>(list: T[]): [T, T] {
  return list as [T, T];
}
