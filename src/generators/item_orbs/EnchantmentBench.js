// @flow
import type Item from '../../containers/item';
import type { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import Mod from '../../mods/Mod';
import ItemOrb from './ItemOrb';

/**
 * ingame representation of a enchantment bench
 */
export default class Enchantmentbench extends ItemOrb {
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
    if (!anySet(this.applicableTo(item))) {
      const blank_item = item.removeAllImplicits();

      const enchantment = this.chooseMod(blank_item);
      if (enchantment != null) {
        return blank_item.addMod(enchantment);
      }
    }

    return item;
  }

  modsFor(item: Item, whitelist: string[] = []) {
    // replace so ignore full domain
    return super.modsFor(item, [...whitelist, 'domain_full']);
  }
}
