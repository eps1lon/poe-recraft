// @flow
import _ from 'lodash';

import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import RollableMod from '../Mod/RollableMod';
import Currency from './Currency';
import Augment from './Augment';
import Scouring from './Scouring';
import Transmute from './Transmute';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Alteration extends Currency {
  static APPLICABLE_FLAGS = Currency.APPLICABLE_FLAGS.concat('NOT_MAGIC');

  static build(mods: ModProps[]): Alteration {
    return super.build(mods, Transmute.modFilter, Alteration);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Alteration.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      // TODO actually considers *_cannot_be_changed?
      // granted via scouring but is this true for ingame alts?
      new Scouring().applyTo(item);
      // no complete scour?
      if (!new Transmute(this.mods).applyTo(item)) {
        new Augment(this.mods).applyTo(item);
      }

      return true;
    } else {
      return false;
    }
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    if (item.rarity !== 'magic') {
      this.applicable_flags.enable('NOT_MAGIC');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'Orb of Alteration';
  }
}
