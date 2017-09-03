// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import Mod from '../Mod/';
import Currency from './Currency';

/**
 * ingame representation of a enchantment bench
 * 
 * TODO:
 * applicableByteHuman
 */
export default class Enchantmentbench extends Currency {
  static modFilter(mod: ModProps): boolean {
    return [Mod.TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1;
  }

  static build(mods: ModProps[]): Enchantmentbench {
    return super.build(mods, Enchantmentbench.modFilter, Enchantmentbench);
  }

  /**
   * replaces implicits with new enchantment mod
   */
  applyTo(item: Item): boolean {
    if (this.applicableTo(item)) {
      item.removeAllImplicits();

      const enchantment = this.chooseMod(item);
      if (enchantment != null) {
        return item.addImplicit(enchantment);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    return true;
  }

  name() {
    return 'Enchantmentbench';
  }
}
