// @flow
import type { Applicable } from '../interfaces';
import type { Item } from '../containers/';
import type { Mod } from '../mods/';

import { AbstractMethod } from '../exceptions/';
import { type Flags } from '../Flags';

export type GeneratorDetails = {
  mod: Mod,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number,
};

/**
 * @abstract
 * TODO:
 * applicableByteHuman()
 */
export default class Generator<T: Mod> implements Applicable {
  mods: T[];

  constructor(mods: T[]) {
    this.mods = mods;
  }

  // eslint-disable-next-line no-unused-vars
  applyTo(item: Item): Item {
    throw new AbstractMethod('applyTo');
  }

  /**
   * returns a copy of #mods
   * 
   * we can stick with a shallow copy since Mod are supposed to be immutable
   */
  getAvailableMods(): T[] {
    return this.mods.slice();
  }

  // eslint-disable-next-line no-unused-vars
  modsFor(item: Item, whitelist: string[] = []): GeneratorDetails[] {
    throw new AbstractMethod('ModGenerator#modsFor');
  }

  // eslint-disable-next-line no-unused-vars
  applicableTo(item: Item): Flags<*> {
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
  rollMod(item: Item): Item {
    const mod = this.chooseMod(item);
    if (mod != null) {
      return item.addMod(mod);
    } else {
      return item;
    }
  }
}
