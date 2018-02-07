import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Transmute from './Transmute';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_magic: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Augment extends ItemOrb {
  public static build(mods: ModProps[]): Augment {
    return new Augment(Transmute.buildMods(mods));
  }

  /**
   * adds one random property
   */
  public applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      return this.rollMod(item);
    } else {
      return item;
    }
  }

  /**
   * item needs to be magic
   */
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
