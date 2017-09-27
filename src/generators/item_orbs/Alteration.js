// @flow
import type { Item } from '../../containers';
import type { ModProps } from '../../schema';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Augment from './Augment';
import Scouring from './Scouring';
import Transmute from './Transmute';

export type ApplicableFlag = BaseApplicableFlag | 'not_magic';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

export default class Alteration extends ItemOrb {
  static build(mods: ModProps[]): Alteration {
    return super.build(mods, Transmute.modFilter, Alteration);
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
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
