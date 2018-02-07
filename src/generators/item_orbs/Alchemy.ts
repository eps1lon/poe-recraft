import * as _ from 'lodash';

import Item from '../../containers/item';
import { ModProps } from '../../schema';
import { Flags, anySet } from '../../util/Flags';

import ItemOrb, {
  ApplicableFlag as BaseApplicableFlag,
  ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Transmute from './Transmute';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_white: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Alchemy extends ItemOrb {
  static build(mods: ModProps[]): Alchemy {
    return new Alchemy(Transmute.buildMods(mods));
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      // upgrade to rare
      let alched_item = item.rarity.set('rare');

      const new_mods = _.random(4, 6);
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
  modsFor(item: Item, whitelist: string[] = []) {
    // simulate upgrade
    return super.modsFor(item.rarity.set('rare'), whitelist);
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
