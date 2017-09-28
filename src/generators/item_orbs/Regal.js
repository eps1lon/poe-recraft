// @flow
import type Item from '../../containers/item';
import type { ModProps } from '../../schema';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Transmute from './Transmute';

export type ApplicableFlag = BaseApplicableFlag | 'not_magic';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

export default class Regal extends ItemOrb {
  static build(mods: ModProps[]): Regal {
    return super.build(mods, Transmute.modFilter, Regal);
  }

  /**
   *  adds 1 mod
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      // upgrade to rare
      return this.rollMod(item.rarity.set('rare'));
    } else {
      return item;
    }
  }

  /**
   * maps mod::applicableTo as if it were already magic
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.rarity.set('rare'), whitelist);
  }

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_magic: false,
    };

    if (!item.rarity.isMagic()) {
      applicable_flags.not_magic = true;
    }

    return applicable_flags;
  }
}
