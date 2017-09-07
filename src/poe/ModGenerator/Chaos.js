// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Currency from './Currency';
import Alchemy from './Alchemy';
import Exalted from './Exalted';
import Scouring from './Scouring';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Chaos extends Currency {
  static ADDITIONAL_APPLICABLE_FLAGS = ['NOT_RARE'];
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat(
    Chaos.ADDITIONAL_APPLICABLE_FLAGS
  );

  static build(mods: ModProps[]): Chaos {
    return super.build(mods, Transmute.modFilter, Chaos);
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): Item {
    if (!this.applicableTo(item).anySet()) {
      // TODO actually considers *_cannot_be_changed?
      // granted via scouring but is this true for ingame alts?
      const scoured_item = new Scouring().applyTo(item);

      let reforged_item = new Alchemy(this.mods).applyTo(scoured_item);

      // no complete scour?
      if (reforged_item === scoured_item) {
        // TODO correlate count
        reforged_item = new Exalted(this.mods).applyTo(reforged_item);
      }

      return reforged_item;
    } else {
      return item;
    }
  }

  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = super
      .applicableTo(item)
      .add(...Chaos.ADDITIONAL_APPLICABLE_FLAGS);

    if (item.rarity !== 'rare') {
      applicable_flags.enable('NOT_RARE');
    }

    return applicable_flags;
  }

  name() {
    return 'Chaos Orb';
  }
}
