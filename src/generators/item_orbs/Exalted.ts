import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Transmute from './Transmute';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_rare: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Exalted extends ItemOrb {
  public static build(mods: ModProps[]): Exalted {
    return new Exalted(Transmute.buildMods(mods));
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
      not_rare: false,
    };

    if (!item.rarity.isRare()) {
      applicable_flags.not_rare = true;
    }

    return applicable_flags;
  }
}
