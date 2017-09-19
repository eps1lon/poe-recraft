// @flow
import _ from 'lodash';

import type { Item } from '../containers';
import type { ModProps } from '../schema';
import { type Flags, anySet } from '../util/Flags';

import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Transmute from './Transmute';

export type ApplicableFlag = BaseApplicableFlag | 'not_white';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

/**
 */
export default class Alchemy extends ItemOrb {
  static build(mods: ModProps[]): Alchemy {
    return super.build(mods, Transmute.modFilter, Alchemy);
  }

  /**
   *  adds 1-2 mods
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      // upgrade to rare
      let alched_item = item.setRarity('rare');

      const new_mods = _.random(4, 6);
      for (let rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
        alched_item = this.rollMod(alched_item);
      }

      const prefixes = alched_item.getPrefixes().length;
      const suffixes = alched_item.getSuffixes().length;
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
    return super.modsFor(item.setRarity('rare'), whitelist);
  }

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_white: false,
    };

    if (item.props.rarity !== 'normal') {
      applicable_flags.not_white = true;
    }

    return applicable_flags;
  }
}
