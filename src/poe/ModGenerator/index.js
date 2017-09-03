// @flow
import type { Applicable } from '../interfaces';
import type Item from '../ModContainer/Item';
import type Mod from '../Mod/';

import { AbstractMethod } from '../../exceptions/';
import FlagSet from '../FlagSet';

/**
 * @abstract
 * TODO:
 * applicableByteHuman()
 */
export default class ModGenerator<T: Mod> implements Applicable {
  static APPLICABLE_FLAGS = [];

  applicable_flags: FlagSet;
  mods: T[];

  constructor(mods: T[]) {
    this.mods = mods;

    this.applicable_flags = new FlagSet(ModGenerator.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  applyTo(item: Item): boolean {
    throw new AbstractMethod('applyTo');
  }

  getAvailableMods(): T[] {
    return this.mods.slice();
  }

  modsFor(item: Item, success: string[] = []): T[] {
    return this.getAvailableMods();
  }

  mapFor(item: Item, success: string[] = []): T[] {
    return this.getAvailableMods();
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    throw new AbstractMethod('applicableTo');
  }

  applicableCached(): boolean {
    return !this.applicable_flags.anySet();
  }

  resetApplicable(): void {
    this.applicable_flags.reset();
  }

  chooseMod(item: Item): ?T {
    const mods = this.modsFor(item);

    // TODO spawnweight
    return mods[Math.floor(Math.random() * (mods.length - 1))];
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
