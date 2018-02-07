import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Mod from '../../mods/Mod';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_white: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Transmute extends ItemOrb {
  public static modFilter(mod: ModProps): boolean {
    // prefix/suffix only
    return (
      super.modFilter(mod) &&
      [Mod.TYPE.PREFIX, Mod.TYPE.SUFFIX].indexOf(mod.generation_type) !== -1
    );
  }

  public static build(mods: ModProps[]): Transmute {
    return new Transmute(this.buildMods(mods));
  }

  /**
   *  adds 1-2 mods
   */
  public applyTo(item: Item): Item {
    let new_item = item;

    if (!anySet(this.applicableTo(item))) {
      new_item = item.rarity.set('magic');

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
  public modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.rarity.set('magic'), whitelist);
  }

  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_white: false,
    };

    if (!item.rarity.isNormal()) {
      applicable_flags.not_white = true;
    }

    return applicable_flags;
  }
}
