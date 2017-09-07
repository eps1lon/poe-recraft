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
  applyTo(item: Item): Item {
    if (!this.applicableTo(item).anySet()) {
      // TODO actually considers *_cannot_be_changed?
      // granted via scouring but is this true for ingame alts?
      const scoured_item = new Scouring().applyTo(item);

      let reforged_item = new Transmute(this.mods).applyTo(scoured_item);
      // no complete scour?
      if (reforged_item === scoured_item) {
        reforged_item = new Augment(this.mods).applyTo(reforged_item);
      }

      return reforged_item;
    } else {
      return item;
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
