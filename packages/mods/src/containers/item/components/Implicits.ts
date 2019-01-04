import { Mod } from '../../../mods';

import ImmutableContainer from '../../ImmutableContainer';
import Item from '../Item';

export interface Builder {
  item: Item;
  mods: Mod[];
}

/**
 * the implicits of an item
 */
export default class Implicits extends ImmutableContainer<Mod, Builder> {
  public static withBuilder(builder: Builder): Implicits {
    return new Implicits(builder.item, builder.mods);
  }

  public item: Item;

  constructor(item: Item, mods: Mod[]) {
    super(mods);

    this.item = item;
  }

  /**
   * @override
   */
  public maxModsOfType(mod: Mod): number {
    switch (mod.props.generation_type) {
      case Mod.GENERATION_TYPE.PREMADE:
        return 5;
      case Mod.GENERATION_TYPE.ENCHANTMENT:
        return 1;
      case Mod.GENERATION_TYPE.VAAL:
        return 1;
      // no other generation types allowed
      default:
        return -1;
    }
  }

  /**
   * @override
   *  checks if the domains are equiv
   */
  public inDomainOf(): boolean {
    return true;
  }

  /**
   * @override
   */
  public level(): number {
    return this.item.props.item_level;
  }
}
