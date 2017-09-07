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
  applyTo(item: Item): boolean {
    if (!this.applicableTo(item).anySet()) {
      // TODO actually considers *_cannot_be_changed?
      // granted via scouring but is this true for ingame alts?
      new Scouring().applyTo(item);
      // no complete scour?
      if (!new Alchemy(this.mods).applyTo(item)) {
        // TODO correlate count
        new Exalted(this.mods).applyTo(item);
      }

      return true;
    } else {
      return false;
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
