// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
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
  applyTo(item: Item): Item {
    if (this.applicableTo(item)) {
      const blank_item = item.removeAllImplicits();

      const enchantment = this.chooseMod(blank_item);
      if (enchantment != null) {
        return blank_item.addImplicit(enchantment);
      }
    }

    return item;
  }

  applicableTo(item: Item, success: string[] = []): FlagSet {
    return new FlagSet([]);
  }

  name() {
    return 'Enchantmentbench';
  }
}
