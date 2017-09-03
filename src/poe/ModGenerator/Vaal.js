// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import Currency from './Currency';

/**
 * TODO:
 * applicableByteHuman
 */
export default class Vaal extends Currency {
  static modFilter(mod: ModProps): boolean {
    // vaal implicits
    return [Mod.TYPE.VAAL].indexOf(mod.generation_type) !== -1;
  }

  static build(mods: ModProps[]): Vaal {
    return super.build(mods, Vaal.modFilter, Vaal);
  }

  /**
   * replaces implicit with vaal implicit
   * TODO: white sockets, reroll (brick(, nothing
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      item.removeAllImplicits();

      const implicit = this.chooseMod(item);
      if (implicit != null && item.addImplicit(implicit)) {
        item.corrupt();
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  name() {
    return 'Vaal Orb';
  }
}
