// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Exalted extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat('NOT_RARE');

  static build(mods: ModProps[]): Exalted {
    return super.build(mods, Transmute.modFilter, Exalted);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Exalted.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   * adds one random property
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      return this.rollMod(item);
    } else {
      return false;
    }
  }

  /**
   * item needs to be magic
   */
  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    if (item.rarity !== 'rare') {
      this.applicable_flags.enable('NOT_RARE');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'Exalted Orb';
  }
}
