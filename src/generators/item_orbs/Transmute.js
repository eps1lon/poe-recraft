// @flow
import type { Item } from '../../containers';
import type { ModProps } from '../../schema';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import { Mod } from '../../mods';

export type ApplicableFlag = BaseApplicableFlag | 'not_white';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

export default class Transmute extends ItemOrb {
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
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.rarity.set('magic'), whitelist);
  }

  applicableTo(item: Item): ApplicableFlags {
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
