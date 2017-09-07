// @flow
import type { Applicable } from '../interfaces';
import type Item from '../ModContainer/Item';
import type Mod from '../Mod/';

import { AbstractMethod } from '../../exceptions/';
import FlagSet from '../FlagSet';

export type GeneratorDetails = {
  mod: Mod,
  applicable?: FlagSet,
  spawnable?: FlagSet,
  spawnweight?: number
};

/**
 * @abstract
 * TODO:
 * applicableByteHuman()
 */
export default class ModGenerator<T: Mod> implements Applicable {
  static APPLICABLE_FLAGS = [];

  mods: T[];

  constructor(mods: T[]) {
    this.mods = mods;
  }

  applyTo(item: Item): boolean {
    throw new AbstractMethod('applyTo');
  }

  getAvailableMods(): T[] {
    return this.mods.slice();
  }

  modsFor(item: Item, whitelist: string[] = []): GeneratorDetails[] {
    throw new AbstractMethod('ModGenerator#modsFor');
  }

  applicableTo(item: Item): FlagSet {
    throw new AbstractMethod('applicableTo');
  }

  // would like to return ?T but i cant make Details to be generic
  chooseMod(item: Item): ?Mod {
    const details = this.modsFor(item);
    const detail = details[Math.floor(Math.random() * (details.length - 1))];

    // TODO spawnweight
    if (detail != null) {
      return detail.mod;
    } else {
      return undefined;
    }
  }

  /**
   * adds a mod from chooseMod ignoring if it's applicable
   * @param {Item} item 
   */
  rollMod(item: Item): boolean {
    const mod = this.chooseMod(item);
    if (mod != null) {
      return item.addMod(mod);
    } else {
      return false;
    }
  }

  name(): string {
    return 'AbstractModGenerator';
  }
}
