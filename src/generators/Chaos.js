// @flow
import type { Item } from '../containers/';
import type { ModProps } from '../data/schema';

import { type Flags, anySet } from '../Flags';
import Currency, {
  type ApplicableFlag as CurrencyApplicableFlag,
  type ApplicableFlags as CurrencyApplicableFlags,
} from './Currency';
import Alchemy from './Alchemy';
import Exalted from './Exalted';
import Scouring from './Scouring';
import Transmute from './Transmute';

export type ApplicableFlag = CurrencyApplicableFlag | 'not_rare';
export type ApplicableFlags = CurrencyApplicableFlags | Flags<ApplicableFlag>;
/**
 * TODO:
 * applicableByteHuman
 */
export default class Chaos extends Currency {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...Currency.APPLICABLE_FLAGS,
    not_rare: false,
  };

  static build(mods: ModProps[]): Chaos {
    return super.build(mods, Transmute.modFilter, Chaos);
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
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

  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = { ...Chaos.APPLICABLE_FLAGS };

    if (item.rarity !== 'rare') {
      applicable_flags.enable('NOT_RARE');
    }

    return applicable_flags;
  }

  name() {
    return 'Chaos Orb';
  }
}
