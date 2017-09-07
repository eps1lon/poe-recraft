// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Currency from './Currency';
import Augment from './Augment';
import Scouring from './Scouring';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Alteration extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_MAGIC'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Alteration.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Alteration {
    return super.build(mods, Transmute.modFilter, Alteration);
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): boolean {
    if (!this.applicableTo(item).anySet()) {
      // TODO actually considers *_cannot_be_changed?
      // granted via scouring but is this true for ingame alts?
      new Scouring().applyTo(item);
      // no complete scour?
      if (!new Transmute(this.mods).applyTo(item)) {
        new Augment(this.mods).applyTo(item);
      }

      return true;
    } else {
      return false;
    }
  }

  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Alteration.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'magic') {
      applicable_flags.enable('NOT_MAGIC');
    }

    return applicable_flags;
  }

  name() {
    return 'Orb of Alteration';
  }
}
