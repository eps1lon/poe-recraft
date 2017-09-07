// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import Currency from './Currency';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Transmute extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_WHITE'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Transmute.ADDITIONAL_APPLICABLE_FLAGS
  );

  static modFilter(mod: ModProps): boolean {
    // prefix/suffix only
    return (
      [Mod.TYPE.PREFIX, Mod.TYPE.SUFFIX].indexOf(mod.generation_type) !== -1
    );
  }

  static build(mods: ModProps[]): Transmute {
    return super.build(mods, Transmute.modFilter, Transmute);
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
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    const old_rarity = item.rarity;
    item.rarity = 'magic';
    const mods = super.modsFor(item, whitelist);
    item.rarity = old_rarity;

    return mods;
  }

  applicableTo(item: Item): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Transmute.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'normal') {
      applicable_flags.enable('NOT_WHITE');
    }

    return applicable_flags;
  }

  name() {
    return 'Orb of Transmutation';
  }
}
