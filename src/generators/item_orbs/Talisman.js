// @flow
import type { ModProps } from '../../schema';

import Mod from '../../mods/Mod';
import ItemOrb from './ItemOrb';

/**
 * TODO
 */
export default class Talisman extends ItemOrb {
  static modFilter(mod: ModProps): boolean {
    // no mods
    return false;
  }

  static build(mods: ModProps[]): Talisman {
    return super.build(mods, Talisman.modFilter, Talisman);
  }
}
