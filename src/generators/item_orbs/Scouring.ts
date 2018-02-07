import Item from '../../containers/item';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';

export interface ApplicableFlags extends BaseApplicableFlags {
  normal: boolean;
  unique: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Scouring extends ItemOrb {
  constructor() {
    super([]);
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */
  public applyTo(other: Item): Item {
    if (!anySet(this.applicableTo(other))) {
      let scoured_item: Item = other;

      const locked_prefixes = scoured_item.affixes.lockedPrefixes();
      const locked_suffixes = scoured_item.affixes.lockedSuffixes();

      if (!locked_prefixes) {
        scoured_item = scoured_item.affixes
          .getPrefixes()
          .reduce((item, prefix) => item.removeMod(prefix), scoured_item);
      }

      if (!locked_suffixes) {
        scoured_item = scoured_item.affixes
          .getSuffixes()
          .reduce((item, suffix) => item.removeMod(suffix), scoured_item);
      }

      // set correct rarity
      const remaining_prefixes = scoured_item.affixes.getPrefixes().length;
      const remaining_suffixes = scoured_item.affixes.getSuffixes().length;

      let new_rarity = other.rarity.toString();

      if (remaining_prefixes === 0 && remaining_suffixes === 0) {
        new_rarity = 'normal';
      }

      return scoured_item.rarity.set(new_rarity);
    } else {
      return other;
    }
  }

  /**
   * checks if normal or unique rarity and returns false
   */
  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      normal: false,
      unique: false,
    };

    if (item.rarity.isNormal()) {
      applicable_flags.normal = true;
    } else if (item.rarity.isUnique()) {
      applicable_flags.unique = true;
    }

    return applicable_flags;
  }
}
