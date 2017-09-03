// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Transmute extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat('NOT_WHITE');

  static modFilter(mod: ModProps): boolean {
    // prefix/suffix only
    return (
      [Mod.TYPE.PREFIX, Mod.TYPE.SUFFIX].indexOf(mod.generation_type) !== -1
    );
  }

  static build(mods: ModProps[]): Transmute {
    return super.build(mods, Transmute.modFilter, Transmute);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Transmute.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      // upgrade to rare
      item.rarity = 'magic';

      this.rollMod(item);

      if (Math.random() <= 0.5) {
        this.rollMod(item);
      }

      return true;
    }

    return false;
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  mapFor(item: Item, success: string[] = []): RollableMod[] {
    // simulate upgrade
    const old_rarity = item.rarity;
    item.rarity = 'magic';
    const mods = super.mapFor(item, success);
    item.rarity = old_rarity;

    return mods;
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, success: string[] = []): RollableMod[] {
    // simulate upgrade
    const old_rarity = item.rarity;
    item.rarity = 'magic';
    const mods = super.modsFor(item, success);
    item.rarity = old_rarity;

    return mods;
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    if (item.rarity !== 'normal') {
      this.applicable_flags.enable('NOT_WHITE');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'Orb of Transmutation';
  }
}
