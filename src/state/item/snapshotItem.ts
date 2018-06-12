import { Popup as ItemPopup, Rarity } from 'poe-components-item';
import { formatStats, Fallback } from 'poe-i18n';
import { Container, Item, ArmourProperties, WeaponProperties } from 'poe-mods';

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
    requirements: snapshotRequirements(item),
    corrupted: item.props.corrupted,
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
  } else if (properties instanceof WeaponProperties) {
    return {
      ...base_properties,
      ...snapshotWeaponProperties(properties)
    };
  } else {
    return base_properties;
  }
}

function snapshotWeaponProperties(properties: WeaponProperties) {
  const cold_damage = properties.cold_damage();
  const fire_damage = properties.fire_damage();
  const lightning_damage = properties.lightning_damage();
  const chaos_damage = properties.chaos_damage();

  return {
    physical_damage: properties.physical_damage(),
    cold_damage: [cold_damage.min.value, cold_damage.max.value],
    fire_damage: [fire_damage.min.value, fire_damage.max.value],
    lightning_damage: [lightning_damage.min.value, lightning_damage.max.value],
    chaos_damage: [chaos_damage.min.value, chaos_damage.max.value],
    aps: properties.attack_speed(),
    crit: properties.crit(),
    range: properties.weapon_range()
  };
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
