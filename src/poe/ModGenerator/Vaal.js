// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

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
  applyTo(item: Item): Item {
    if (this.applicableTo(item)) {
      const blank_item = item.removeAllImplicits();

      const implicit = this.chooseMod(blank_item);

      if (implicit != null) {
        const vaaled_item = blank_item.addImplciit(implicit);

        if (vaaled_item !== blank_item) {
          return vaaled_item.corrupt();
        }
      }
    }

    // nothing changed
    return item;
  }

  name() {
    return 'Vaal Orb';
  }
}
