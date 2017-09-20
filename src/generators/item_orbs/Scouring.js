// @flow
import type { Item, Rarity } from '../../containers';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';

export type ApplicableFlag = BaseApplicableFlag | 'normal' | 'unique';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Scouring extends ItemOrb {
  constructor() {
    super([]);
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */
  applyTo(other: Item): Item {
    if (!anySet(this.applicableTo(other))) {
      let scoured_item: Item = other;

      const locked_prefixes = scoured_item.lockedPrefixes();
      const locked_suffixes = scoured_item.lockedSuffixes();

      if (!locked_prefixes) {
        scoured_item = scoured_item
          .getPrefixes()
          .reduce((item, prefix) => item.removeMod(prefix), scoured_item);
      }

      if (!locked_suffixes) {
        scoured_item = scoured_item
          .getSuffixes()
          .reduce((item, suffix) => item.removeMod(suffix), scoured_item);
      }

      // set correct rarity
      const remaining_prefixes = scoured_item.getPrefixes().length;
      const remaining_suffixes = scoured_item.getSuffixes().length;

      let new_rarity: Rarity;

      if (remaining_prefixes === 0 && remaining_suffixes === 0) {
        new_rarity = 'normal';
      } else {
        new_rarity = other.props.rarity;
      }

      return scoured_item.setRarity(new_rarity);
    } else {
      return other;
    }
  }

  /**
   * checks if normal or unique rarity and returns false
   */
  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      normal: false,
      unique: false,
    };

    switch (item.props.rarity) {
      case 'normal':
        applicable_flags.normal = true;
        break;
      case 'unique':
        applicable_flags.unique = true;
        break;
      default:
      // noop
    }

    return applicable_flags;
  }
}
