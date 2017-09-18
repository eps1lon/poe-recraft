// @flow
import type { Item } from '../containers';
import type { ModProps } from '../schema';

import { type Flags, anySet } from '../util/Flags';
import Currency, {
  type ApplicableFlag as CurrencyApplicableFlag,
  type ApplicableFlags as CurrencyApplicableFlags,
} from './Currency';
import { Mod } from '../mods';

export type ApplicableFlag = CurrencyApplicableFlag | 'not_white';
export type ApplicableFlags = CurrencyApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Transmute extends Currency {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...Currency.APPLICABLE_FLAGS,
    not_white: false,
  };

  static modFilter(mod: ModProps): boolean {
    // prefix/suffix only
    return (
      [Mod.TYPE.PREFIX, Mod.TYPE.SUFFIX].indexOf(mod.generation_type) !== -1
    );
  }

  static build(mods: ModProps[]): Transmute {
    return super.build(mods, Transmute.modFilter, Transmute);
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): Item {
    let new_item = item;

    if (!anySet(this.applicableTo(item))) {
      new_item = item.setRarity('magic');

      new_item = this.rollMod(new_item);

      if (Math.random() <= 0.5) {
        new_item = this.rollMod(new_item);
      }

      return new_item;
    }

    return new_item;
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.setRarity('magic'), whitelist);
  }

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = { ...Transmute.APPLICABLE_FLAGS };

    if (item.props.rarity !== 'normal') {
      applicable_flags.not_white = true;
    }

    return applicable_flags;
  }
}
