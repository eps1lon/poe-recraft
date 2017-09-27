// @flow
import type { Item } from '../../containers';
import type { ModProps } from '../../schema';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Transmute from './Transmute';

export type ApplicableFlag = BaseApplicableFlag | 'not_magic';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

export default class Augment extends ItemOrb {
  static build(mods: ModProps[]): Augment {
    return super.build(mods, Transmute.modFilter, Augment);
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
