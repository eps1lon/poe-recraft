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
  applyTo(item: Item): Item {
    if (!this.applicableTo(item).anySet()) {
      // upgrade to rare
      let alched_item = item.setRarity('rare');

      const new_mods = _.random(4, 6);
      for (let rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
        alched_item = this.rollMod(alched_item);
      }

      const prefixes = alched_item.getPrefixes().length;
      const suffixes = alched_item.getSuffixes().length;
      const diff = Math.abs(prefixes - suffixes);
      const missing_mods = Math.max(0, diff - 1);

      // correct differences between #prefixes, #suffixes >= 2
      for (let rolled_mods = 1; rolled_mods <= missing_mods; rolled_mods += 1) {
        alched_item = this.rollMod(alched_item);
      }

      return alched_item;
    }

    return item;
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.setRarity('rare'), whitelist);
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
