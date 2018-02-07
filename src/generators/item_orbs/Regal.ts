import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Transmute from './Transmute';
import { GeneratorDetails } from '../Generator';
import Mod from '../../mods/Mod';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_magic: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Regal extends ItemOrb {
  public static build(mods: ModProps[]): Regal {
    return new Regal(Transmute.buildMods(mods));
  }

  /**
   *  adds 1 mod
   */
  public applyTo(item: Item): Item {
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
  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    // simulate upgrade
    return super.modsFor(item.rarity.set('rare'), whitelist);
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
