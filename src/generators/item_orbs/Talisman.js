// @flow
import type { ModProps } from '../../schema';

import ItemOrb from './ItemOrb';

/**
 * TODO
 */
export default class Talisman extends ItemOrb {
  static modFilter(): boolean {
    // no mods
    return false;
  }

  static build(mods: ModProps[]): Talisman {
    return super.build(mods, Talisman.modFilter, Talisman);
  }
}
