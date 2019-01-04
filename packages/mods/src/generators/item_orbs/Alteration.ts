import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Augment from './Augment';
import Scouring from './Scouring';
import Transmute from './Transmute';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_magic: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Alteration extends ItemOrb {
  public static build(mods: ModProps[]): Alteration {
    return new Alteration(Transmute.buildMods(mods));
  }

  /**
   *  rerolls properties of magic
   */
  public applyTo(item: Item): Item {
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

  public applicableTo(item: Item): ApplicableFlags {
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
