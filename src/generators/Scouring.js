// @flow
import type { Item, Rarity } from '../containers/';

import { type Flags, anySet } from '../Flags';
import Currency, {
  type ApplicableFlag as CurrencyApplicableFlag,
  type ApplicableFlags as CurrencyApplicableFlags
} from './Currency';
import { metaMods as META_MODS } from './';

export type ApplicableFlag = CurrencyApplicableFlag | 'not_white' | 'unique';
export type ApplicableFlags = CurrencyApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Scouring extends Currency {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...Currency.APPLICABLE_FLAGS,
    not_white: false,
    unique: false
  };

  constructor() {
    super([]);
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      let scoured_item: Item = item;

      const locked_prefixes =
        scoured_item.indexOfModWithPrimary(META_MODS.LOCKED_PREFIXES) !== -1;
      const locked_suffixes =
        scoured_item.indexOfModWithPrimary(META_MODS.LOCKED_SUFFIXES) !== -1;

      if (!locked_prefixes) {
        for (const prefix of scoured_item.getPrefixes()) {
          scoured_item = scoured_item.removeMod(prefix);
        }
      }

      if (!locked_suffixes) {
        for (const suffix of scoured_item.getSuffixes()) {
          scoured_item = scoured_item.removeMod(suffix);
        }
      }

      // set correct rarity
      const remaining_prefixes = scoured_item.getPrefixes().length;
      const remaining_suffixes = scoured_item.getSuffixes().length;

      let new_rarity: Rarity = 'magic';

      if (remaining_prefixes === 0 && remaining_suffixes === 0) {
        new_rarity = 'normal';
      } else if (remaining_prefixes > 1 || remaining_suffixes > 1) {
        new_rarity = 'rare';
      }

      return scoured_item.setRarity(new_rarity);
    } else {
      return item;
    }
  }

  /**
   * checks if normal or unique rarity and returns false
   */
  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = { ...Scouring.APPLICABLE_FLAGS };

    switch (item.props.rarity) {
      case 'normal':
        applicable_flags.enable('ALREADY_WHITE');
        break;
      case 'unique':
        applicable_flags.enable('UNIQUE');
        break;
    }

    return applicable_flags;
  }

  name() {
    return 'Orb of Scouring';
  }
}
