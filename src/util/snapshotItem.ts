import {
  Popup as ItemPopup,
  Rarity as ComponentRarity
} from 'poe-components-item';
import { Item } from 'poe-mods';

// returns an object with all props for poe-components-item/popup
export default function snapshotItem(item: Item): ItemPopup['props']['item'] {
  return {
    base: {
      name: item.baseitem.name
    },
    rarity: mapRarity(item)
  };
}

function mapRarity(item: Item): ComponentRarity {
  if (item.rarity.isNormal()) {
    return ComponentRarity.normal;
  } else if (item.rarity.isMagic()) {
    return ComponentRarity.magic;
  } else if (item.rarity.isRare()) {
    return ComponentRarity.rare;
  } else if (item.rarity.isUnique()) {
    return ComponentRarity.unique;
  } else {
    throw new Error('unrecognized item rarity');
  }
}
