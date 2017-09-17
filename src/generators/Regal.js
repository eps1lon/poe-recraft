// @flow
import type { Item } from '../containers/';
import type { ModProps } from '../data/schema';

import { type Flags, anySet } from '../Flags';
import Currency, {
  type ApplicableFlag as CurrencyApplicableFlag,
  type ApplicableFlags as CurrencyApplicableFlags,
} from './Currency';
import Transmute from './Transmute';

export type ApplicableFlag = CurrencyApplicableFlag | 'not_magic';
export type ApplicableFlags = CurrencyApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Regal extends Currency {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...Currency.APPLICABLE_FLAGS,
    not_magic: false,
  };

  static build(mods: ModProps[]): Regal {
    return super.build(mods, Transmute.modFilter, Regal);
  }

  /**
   *  adds 1 mod
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
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

  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = { ...Regal.APPLICABLE_FLAGS };

    if (item.props.rarity !== 'magic') {
      applicable_flags.not_magic = true;
    }

    return applicable_flags;
  }
}
