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
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_MAGIC'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Regal.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Regal {
    return super.build(mods, Transmute.modFilter, Regal);
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): Item {
    if (!this.applicableTo(item).anySet()) {
      // upgrade to rare
      return this.rollMod(item.setRarity('rare'));
    } else {
      return item;
    }
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.setRarity('rare'), whitelist);
  }

  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Regal.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'rare') {
      applicable_flags.enable('NOT_MAGIC');
    }

    return applicable_flags;
  }

  name() {
    return 'Regal Orb';
  }
}
