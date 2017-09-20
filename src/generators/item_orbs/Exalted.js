// @flow
import type { Item } from '../../containers';
import type { ModProps } from '../../schema';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Transmute from './Transmute';

export type ApplicableFlag = BaseApplicableFlag | 'not_rare';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO:
 * applicableByteHuman
 */
export default class Exalted extends ItemOrb {
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
  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_rare: false,
    };

    if (item.props.rarity !== 'rare') {
      applicable_flags.not_rare = true;
    }

    return applicable_flags;
  }
}
