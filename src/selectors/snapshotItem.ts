import { Popup as ItemPopup, Rarity } from 'poe-components-item';
import { formatStats } from 'poe-i18n';
import { Container, Item, ItemArmourProperties } from 'poe-mods';

/**
 * creates a "dumb" object with view relevant properties from item
 *
 * can be used for poe-components-item#ItemPopup
 * @param item
 */
export default function snapshotItem(
  item: Item,
  descriptions: {}
): ItemPopup['props']['item'] {
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
      name: item.baseitem.id
    },
    name: item.name.lines()[0],
    elder: item.isElderItem(),
    shaper: item.isSHaperItem(),
    implicits: statsTranslated(item.implicits, descriptions),
    explicits: statsTranslated(item.affixes, descriptions),
    rarity,
    ...properties,
    requirements: snapshotRequirements(item)
  };
}

function snapshotProperties(item: Item) {
  const { properties } = item;
  const base_properties = {
    quality: properties.quality
  };

  if (properties instanceof ItemArmourProperties) {
    const { armour, energy_shield, evasion } = properties.defences();

    return {
      ...base_properties,
      armour: {
        augmented: armour.type === 'augmented',
        value: armour.values
      },
      energy_shield: {
        augmented: energy_shield.type === 'augmented',
        value: energy_shield.values
      },
      evasion: {
        augmented: evasion.type === 'augmented',
        value: evasion.values
      }
    };
  } else {
    return base_properties;
  }
}

function snapshotRequirements(item: Item) {
  const { level, dex, int, str } = item.requirements.list();

  return {
    level: {
      augmented: false,
      value: level
    },
    dexterity: {
      augmented: false,
      value: dex
    },
    intelligence: {
      augmented: false,
      value: int
    },
    strength: {
      augmented: false,
      value: str
    }
  };
}

function statsTranslated(container: Container<any>, descriptions: {}) {
  return formatStats(
    Object.entries(container.stats()).map(([id, stat]) => {
      return {
        id,
        value: stat.values.valueOf()
      };
    }),
    { datas: descriptions }
  );
}
