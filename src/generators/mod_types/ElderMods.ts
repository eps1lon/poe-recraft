import { GeneratorDetails } from '../Generator';
import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';

/**
 * Generator for all mods that are possible of the item is an Elder item
 */
export default class ElderMods extends ViewOnlyOrb {
  public static build(mods: ModProps[]): ElderMods {
    return new ElderMods(
      mods.filter(ElderMods.isElderMod).map(props => new Mod(props)),
    );
  }

  public static isElderMod(mod: ModProps) {
    const spawnweight = mod.spawn_weights.find(({ tag }) =>
      tag.endsWith('_elder'),
    );
    if (spawnweight === undefined) {
      return false;
    } else {
      return spawnweight.value > 0;
    }
  }

  /**
   * returns mods that could appear on the given item if it is a Elder 
   * influenced item. Ignores maximum number of possible mods.
   * 
   * @param item 
   * @param whitelist
   */
  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    return super.modsFor(item.asElderItem(), whitelist);
  }
}
