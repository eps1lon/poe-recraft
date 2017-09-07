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
export default class Augment extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_MAGIC'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Augment.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Augment {
    return super.build(mods, Transmute.modFilter, Augment);
  }

  /**
   * adds one random property
   */
  applyTo(item: Item): Item {
    if (!this.applicableTo(item).anySet()) {
      return this.rollMod(item);
    } else {
      return item;
    }
  }

  /**
   * item needs to be magic
   */
  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Augment.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'magic') {
      applicable_flags.enable('NOT_MAGIC');
    }

    return applicable_flags;
  }

  name() {
    return 'Orb of Augmentation';
  }
}
