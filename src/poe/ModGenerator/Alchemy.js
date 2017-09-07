// @flow
import _ from 'lodash';

import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';
import type { GeneratorDetails } from './';

import FlagSet from '../FlagSet';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Alchemy extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_WHITE'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Alchemy.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Alchemy {
    return super.build(mods, Transmute.modFilter, Alchemy);
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): boolean {
    if (!this.applicableTo(item).anySet()) {
      // upgrade to rare
      item.rarity = 'rare';

      const new_mods = _.random(4, 6);
      for (let rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
        this.rollMod(item);
      }

      const prefixes = item.getPrefixes().length;
      const suffixes = item.getSuffixes().length;
      const diff = Math.abs(prefixes - suffixes);
      const missing_mods = Math.max(0, diff - 1);

      // correct differences between #prefixes, #suffixes >= 2
      for (let rolled_mods = 1; rolled_mods <= missing_mods; rolled_mods += 1) {
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
      .add(...Alchemy.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'normal') {
      applicable_flags.enable('NOT_WHITE');
    }

    return applicable_flags;
  }

  name() {
    return 'Orb of Alchemy';
  }
}
