import { ModProps } from '../../schema';

import Item from '../../containers/item';
import ItemOrb from './ItemOrb';

/**
 * TODO
 */
export default class Talisman extends ItemOrb {
  public static modFilter(): boolean {
    // no mods
    return false;
  }

  public static build(mods: ModProps[]): Talisman {
    return new Talisman(this.buildMods(mods));
  }

  public applyTo(item: Item): Item {
    throw new Error('not implemented');
  }
}
