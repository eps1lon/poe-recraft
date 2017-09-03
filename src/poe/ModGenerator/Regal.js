// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Regal extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat('NOT_MAGIC');

  static build(mods: ModProps[]): Regal {
    return super.build(mods, Transmute.modFilter, Regal);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Regal.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      // upgrade to rare
      item.rarity = 'rare';

      return this.rollMod(item);
    } else {
      return false;
    }
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  mapFor(item: Item, success: string[] = []): RollableMod[] {
    // simulate upgrade
    const old_rarity = item.rarity;
    item.rarity = 'rare';
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
    item.rarity = 'rare';
    const mods = super.modsFor(item, success);
    item.rarity = old_rarity;

    return mods;
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    if (item.rarity !== 'rare') {
      this.applicable_flags.enable('NOT_MAGIC');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'Regal Orb';
  }
}
