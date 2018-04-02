import Item from '../../containers/item';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';

export interface ApplicableFlags extends BaseApplicableFlags {
  normal: boolean;
  unique: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

/**
 * options for Scouring.applyTo()
 */
export interface ApplyToOptions {
  /**
   * ignores meta mods such as "Prefixes cannot be changed"
   */
  ignore_meta_mods: boolean;
  /**
   * apply even if not applyicable
   */
  force: boolean;
}

export default class Scouring extends ItemOrb {
  constructor() {
    super([]);
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */
  public applyTo(other: Item, options: Partial<ApplyToOptions> = {}): Item {
    const { force = false, ignore_meta_mods = false } = options;

    if (force || !anySet(this.applicableTo(other))) {
      let scoured_item: Item = other;

      if (!ignore_meta_mods) {
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
      } else {
        scoured_item = scoured_item.removeAllMods();
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
