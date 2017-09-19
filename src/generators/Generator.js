// @flow
import type { Applicable } from '../interfaces';
import type { Container } from '../containers/';
import type { Mod } from '../mods/';

import { AbstractMethod } from '../exceptions';
import { type Flags } from '../util/Flags';

export type GeneratorDetails<T: Mod> = {
  mod: T,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number,
};

/**
 * @abstract
 * TODO:
 * applicableByteHuman()
 */
export default class Generator<T: Mod, C: Container<*>>
  implements Applicable<C> {
  mods: T[];

  constructor(mods: T[]) {
    this.mods = mods;
  }

  // eslint-disable-next-line no-unused-vars
  applyTo(container: C): C {
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
  modsFor(container: C, whitelist: string[] = []): GeneratorDetails<T>[] {
    throw new AbstractMethod('ModGenerator#modsFor');
  }

  // eslint-disable-next-line no-unused-vars
  applicableTo(container: C): Flags<*> {
    throw new AbstractMethod('applicableTo');
  }

  chooseMod(container: C): ?T {
    const details = this.modsFor(container);
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
  rollMod(container: C): C {
    const mod = this.chooseMod(container);
    if (mod != null) {
      return container.addMod(mod);
    } else {
      return container;
    }
  }
}
