// @flow
import _ from 'lodash';

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
export default class Alchemy extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat('NOT_WHITE');

  static build(mods: ModProps[]): Alchemy {
    return super.build(mods, Transmute.modFilter, Alchemy);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Alchemy.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
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
    return 'Orb of Alchemy';
  }
}
