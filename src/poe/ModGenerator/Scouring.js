// @flow
import _ from 'lodash';

import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import META_MODS from '../Mod/meta_mods';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Scouring extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    'ALREADY_WHITE',
    'UNIQUE'
  );

  constructor() {
    super([]);

    this.applicable_flags = new FlagSet(Scouring.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      const locked_prefixes =
        item.getImplicitIndexOfModWithPrimary(META_MODS.LOCKED_PREFIXES) !== -1;
      const locked_suffixes =
        item.getImplicitIndexOfModWithPrimary(META_MODS.LOCKED_SUFFIXES) !== -1;

      if (!locked_prefixes) {
        for (const prefix of item.getPrefixes()) {
          item.removeMod(prefix);
        }
      }

      if (!locked_suffixes) {
        for (const suffix of item.getSuffixes()) {
          item.removeMod(suffix);
        }
      }

      // set correct rarity
      const remaining_prefixes = item.getPrefixes().length;
      const remaining_suffixes = item.getSuffixes().length;

      if (remaining_prefixes === 0 && remaining_suffixes === 0) {
        item.rarity = 'normal';
      } else if (remaining_prefixes > 1 || remaining_suffixes > 1) {
        item.rarity = 'rare';
      } else {
        item.rarity = 'magic';
      }

      return true;
    } else {
      return false;
    }
  }

  /**
   * checks if normal or unique rarity and returns false
   */
  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    switch (item.rarity) {
      case 'normal':
        this.applicable_flags.enable('ALREADY_WHITE');
        break;
      case 'unique':
        this.applicable_flags.enable('UNIQUE');
        break;
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'Orb of Scouring';
  }
}
