import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import Mod from '../../mods/Mod';
import ItemOrb from './ItemOrb';
import { GeneratorDetails } from '../Generator';

/**
 * ingame representation of a enchantment bench
 */
export default class Enchantmentbench extends ItemOrb {
  public static modFilter(mod: ModProps): boolean {
    return (
      super.modFilter(mod) &&
      [Mod.GENERATION_TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1
    );
  }

  public static build(mods: ModProps[]): Enchantmentbench {
    return new Enchantmentbench(this.buildMods(mods));
  }

  /**
   * replaces implicits with new enchantment mod
   */
  public applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      const blank_item = item.removeAllImplicits();

      const enchantment = this.chooseMod(blank_item);
      if (enchantment != null) {
        return blank_item.addMod(enchantment);
      }
    }

    return item;
  }

  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    // replace so ignore full domain
    return super.modsFor(item, [...whitelist, 'domain_full']);
  }
}
