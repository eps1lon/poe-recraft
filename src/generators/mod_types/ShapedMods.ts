import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';

/**
 * Generator for all mods that are possible of the item is an Shaper item
 */
export default class ShaperMods extends ViewOnlyOrb {
  public static build(mods: ModProps[]): ShaperMods {
    return new ShaperMods(
      mods.filter(ShaperMods.isShaperMod).map(props => new Mod(props)),
    );
  }

  public static isShaperMod(mod: ModProps) {
    const spawnweight = mod.spawn_weights.find(({ tag }) =>
      tag.endsWith('_shaper'),
    );
    if (spawnweight === undefined) {
      return false;
    } else {
      return spawnweight.value > 0;
    }
  }

  /**
   * returns mods that could appear on the given item if it is a Shaper 
   * influenced item. Ignores maximum number of possible mods.
   * 
   * @param item 
   */
  public modsFor(item: Item, whitelist: string[] = []) {
    return super.modsFor(item.asShaperItem(), whitelist);
  }
}
