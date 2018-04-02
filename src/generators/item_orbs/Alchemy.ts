import * as _ from 'lodash';

import Item from '../../containers/item';
import { ModProps } from '../../schema';
import { anySet } from '../../util/Flags';

import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Transmute from './Transmute';
import { GeneratorDetails } from '../Generator';
import Mod from '../../mods/Mod';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_white: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

/**
 * options for Alchemy#applyTo()
 */
export interface ApplyOptions {
  /**
   * ignores Alchemy#applicableTo() if true
   */
  force: boolean;
}

export default class Alchemy extends ItemOrb {
  public static build(mods: ModProps[]): Alchemy {
    return new Alchemy(Transmute.buildMods(mods));
  }

  /**
   *  adds 1-2 mods
   */
  public applyTo(item: Item, options: Partial<ApplyOptions> = {}): Item {
    const { force = false } = options;

    if (force || !anySet(this.applicableTo(item))) {
      // upgrade to rare
      let alched_item = item.rarity.set('rare');

      // rare items can have no more than 6 affixes
      const new_mods = _.random(4, 6) - item.affixes.mods.length;
      for (let rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
        alched_item = this.rollMod(alched_item);
      }

      const prefixes = alched_item.affixes.getPrefixes().length;
      const suffixes = alched_item.affixes.getSuffixes().length;
      const diff = Math.abs(prefixes - suffixes);
      const missing_mods = Math.max(0, diff - 1);

      // correct differences between #prefixes, #suffixes >= 2
      for (let rolled_mods = 1; rolled_mods <= missing_mods; rolled_mods += 1) {
        alched_item = this.rollMod(alched_item);
      }

      return alched_item;
    }

    return item;
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
      not_white: false,
    };

    if (!item.rarity.isNormal()) {
      applicable_flags.not_white = true;
    }

    return applicable_flags;
  }
}
