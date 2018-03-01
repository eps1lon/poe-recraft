import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Item,
  createItems,
  createMods,
  ItemArmourProperties,
  Container,
} from 'poe-mods';
import { format, Format } from 'poe-i18n';
// 'poe-components-item'
import { Popup, Rarity } from '../../src/';

// tslint:disable: no-var-requires
const items = createItems(require('poe-mods/data/items/equipment.json'));
const mods = createMods([
  ...require('poe-mods/data/mods/prefixes.json'),
  ...require('poe-mods/data/mods/suffixes.json'),
]);
const i18n = {
  base_item_types: require('poe-i18n/locale-data/en/BaseItemTypes.json'),
  datas: {
    stat_descriptions: require('poe-i18n/locale-data/en/stat_descriptions.json'),
  },
};

const base_helmet: Item = items.fromId(
  'Metadata/Items/Armours/Helmets/HelmetInt11',
);
const helmet = base_helmet.rarity
  .set('rare')
  .asShaperItem()
  .addMod(mods.fromId('IncreasedLife0'))
  .addMod(mods.fromId('LocalIncreasedEnergyShield2'))
  .addMod(mods.fromId('LocalIncreasedEnergyShieldPercentAndStunRecovery3'))
  .addMod(mods.fromId('FireResist1'))
  .addMod(mods.fromId('ReducedLocalAttributeRequirements1'))
  .addMod(mods.fromId('AdditionalMinesPlacedSupportedUber1_'));

const snapshotProperties = (item: Item) => {
  const { properties } = item;
  const base_properties = {
    quality: properties.quality,
  };

  if (properties instanceof ItemArmourProperties) {
    const { armour, energy_shield, evasion } = properties.defences();
    console.log(energy_shield)

    return {
      ...base_properties,
      armour: {
        augmented: armour.type === 'augmented',
        value: armour.values,
      },
      energy_shield: {
        augmented: energy_shield.type === 'augmented',
        value: energy_shield.values,
      },
      evasion: {
        augmented: evasion.type === 'augmented',
        value: evasion.values,
      },
    };
  } else {
    return base_properties;
  }
};

const snapshotRequirements = (item: Item) => {
  const { level, dex, int, str } = item.requirements.list();

  return {
    level: {
      augmented: false,
      value: level,
    },
    dexterity: {
      augmented: false,
      value: dex,
    },
    intelligence: {
      augmented: false,
      value: int,
    },
    strength: {
      augmented: false,
      value: str,
    },
  };
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
const snapShotItem = (item: Item, format: Format): Popup['props']['item'] => {
  let rarity: Rarity;
  if (item.rarity.isNormal()) {
    rarity = Rarity.normal;
  } else if (item.rarity.isNormal()) {
    rarity = Rarity.normal;
  } else if (item.rarity.isMagic()) {
    rarity = Rarity.magic;
  } else if (item.rarity.isRare()) {
    rarity = Rarity.rare;
  } else if (item.rarity.isUnique()) {
    rarity = Rarity.unique;
  } else {
    throw new Error('unrecognized rarity');
  }

  const properties = snapshotProperties(item);

  return {
    base: {
      name: i18n.base_item_types[item.baseitem.id].name,
    },
    name: item.name.lines()[0],
    elder: item.isElderItem(),
    shaper: item.isSHaperItem(),
    implicits: statsTranslated(item.implicits, format),
    explicits: statsTranslated(item.affixes, format),
    rarity,
    ...properties,
    requirements: snapshotRequirements(item),
  };
};

format.configure({datas: i18n.datas})

storiesOf('poe-mods integration', module).add('Helmet', () => (
  <Popup item={snapShotItem(helmet, format)} />
));
