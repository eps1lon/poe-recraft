import { PopupIntl as ItemPopup, Rarity } from 'poe-components-item';
import { Fallback, formatStats } from 'poe-i18n';
import { ArmourProperties, Container, Item, WeaponProperties } from 'poe-mods';

import { propOrUndefined } from '../../util/typesafe';

/**
 * creates a "dumb" object with view relevant properties from item
 *
 * can be used for poe-components-item#ItemPopup
 * @param item
 */
export default function snapshotItem(
  item: Item,
  descriptions: {},
): PropsType<typeof ItemPopup>['item'] {
  let rarity: Rarity;
  if (item.rarity.isNormal()) {
    rarity = 'normal';
  } else if (item.rarity.isMagic()) {
    rarity = 'magic';
  } else if (item.rarity.isRare()) {
    rarity = 'rare';
  } else if (item.rarity.isUnique()) {
    rarity = 'unique';
  } else {
    throw new Error('unrecognized rarity');
  }

  const properties = snapshotProperties(item);
  const [typeLineOrName, typeLine] = item.name.lines();
  // for magic items there can only be at most one prefix/suffix
  const prefix = propOrUndefined(
    item.affixes.getPrefixes().map(({ props }) => props)[0],
    'id',
  );
  const suffix = propOrUndefined(
    item.affixes.getSuffixes().map(({ props }) => props)[0],
    'id',
  );

  return {
    base: {
      id: item.baseitem.id,
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
    prefix,
    suffix,
  };
}

function snapshotProperties(item: Item) {
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
    return {
      ...base_properties,
      ...snapshotWeaponProperties(properties),
    };
  } else {
    return base_properties;
  }
}

function snapshotWeaponProperties(properties: WeaponProperties) {
  const physical_damage = properties.physical_damage();
  const cold_damage = properties.cold_damage();
  const fire_damage = properties.fire_damage();
  const lightning_damage = properties.lightning_damage();
  const chaos_damage = properties.chaos_damage();

  return {
    physical_damage: {
      augmented: physical_damage.min.augmented || physical_damage.max.augmented,
      value: unsafeAsTuple([
        physical_damage.min.value,
        physical_damage.max.value,
      ]),
    },
    cold_damage: unsafeAsTuple([cold_damage.min.value, cold_damage.max.value]),
    fire_damage: unsafeAsTuple([fire_damage.min.value, fire_damage.max.value]),
    lightning_damage: unsafeAsTuple([
      lightning_damage.min.value,
      lightning_damage.max.value,
    ]),
    chaos_damage: unsafeAsTuple([
      chaos_damage.min.value,
      chaos_damage.max.value,
    ]),
    aps: properties.attack_speed(),
    crit: properties.crit(),
    range: properties.weapon_range(),
  };
}

function snapshotRequirements(item: Item) {
  const { level, dex, int, str } = item.requirements.list();

  return {
    level,
    dexterity: dex,
    intelligence: int,
    strength: str,
  };
}

function statsTranslated(container: Container<any>, descriptions: {}) {
  return formatStats(
    Object.entries(container.stats()).map(([id, stat]) => {
      return {
        id,
        value: stat.values.valueOf(),
      };
    }),
    { datas: descriptions, fallback: Fallback.id },
  );
}

/**
 * identity function
 * typecasts an array to a tuple
 * no checks at runtime so be sure to only pass explicitly i.e.
 * unsafeAsTuple([1, 2])
 * @param list
 */
function unsafeAsTuple<T>(list: T[]): [T, T] {
  return list as [T, T];
}
