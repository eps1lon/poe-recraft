import { Popup as ItemPopup, Rarity } from 'poe-components-item';
import { formatStats, Fallback } from 'poe-i18n';
import { Container, Item, ArmourProperties } from 'poe-mods';

import { namei18n } from '../../util/item';

/**
 * creates a "dumb" object with view relevant properties from item
 *
 * can be used for poe-components-item#ItemPopup
 * @param item
 */
export default function snapshotItem(
  item: Item,
  descriptions: {},
  messages: {}
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
  const [typeLineOrName, typeLine] = item.name.lines();

  return {
    base: {
      name: namei18n(item, messages)
    },
    name: typeLine !== undefined ? typeLineOrName : undefined,
    elder: item.isElderItem(),
    shaper: item.isSHaperItem(),
    implicitStats: statsTranslated(item.implicits, descriptions),
    explicitStats: statsTranslated(item.affixes, descriptions),
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

  if (properties instanceof ArmourProperties) {
    return {
      ...base_properties,
      ...properties.defences()
    };
  } else {
    return base_properties;
  }
}

function snapshotRequirements(item: Item) {
  const { level, dex, int, str } = item.requirements.list();

  return {
    level,
    dexterity: dex,
    intelligence: int,
    strength: str
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
    { datas: descriptions, fallback: Fallback.id }
  );
}
