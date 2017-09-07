// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Currency from './Currency';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Exalted extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_RARE'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Exalted.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Exalted {
    return super.build(mods, Transmute.modFilter, Exalted);
  }

  /**
   * adds one random property
   */
  applyTo(item: Item): boolean {
    if (!this.applicableTo(item).anySet()) {
      return this.rollMod(item);
    } else {
      return false;
    }
  }

  /**
   * item needs to be magic
   */
  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Exalted.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'rare') {
      applicable_flags.enable('NOT_RARE');
    }

    return applicable_flags;
  }

  name() {
    return 'Exalted Orb';
  }
}
