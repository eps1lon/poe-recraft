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
  applyTo(item: Item): Item {
    let new_item = item;

    if (this.applicableTo(item)) {
      new_item = item.setRarity('magic');

      new_item = this.rollMod(item);

      if (Math.random() <= 0.5) {
        new_item = this.rollMod(item);
      }

      return new_item;
    }

    return new_item;
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.setRarity('magic'), whitelist);
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
