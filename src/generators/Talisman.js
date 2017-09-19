// @flow
import type { ModProps } from '../schema';

import { Mod } from '../mods';
import ItemOrb from './ItemOrb';

/**
 * TODO
 */
export default class Talisman extends ItemOrb {
  static modFilter(mod: ModProps): boolean {
    // talisman wildcard
    return [Mod.TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1;
  }

  static build(mods: ModProps[]): Talisman {
    return super.build(mods, Talisman.modFilter, Talisman);
  }
}
