// @flow
import type { Item } from '../containers/';
import type { ModProps } from '../data/schema';

import { type Flags, anySet } from '../Flags';
import Currency, {
  type ApplicableFlag as CurrencyApplicableFlag,
  type ApplicableFlags as CurrencyApplicableFlags,
} from './Currency';
import Transmute from './Transmute';

export type ApplicableFlag = CurrencyApplicableFlag | 'not_rare';
export type ApplicableFlags = CurrencyApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Exalted extends Currency {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...Currency.APPLICABLE_FLAGS,
    not_rare: false,
  };

  static build(mods: ModProps[]): Exalted {
    return super.build(mods, Transmute.modFilter, Exalted);
  }

  /**
   * adds one random property
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      return this.rollMod(item);
    } else {
      return item;
    }
  }

  /**
   * item needs to be magic
   */
  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = { ...Exalted.APPLICABLE_FLAGS };

    if (item.props.rarity !== 'rare') {
      applicable_flags.not_rare = true;
    }

    return applicable_flags;
  }
}
