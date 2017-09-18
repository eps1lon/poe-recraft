// @flow
import { Mod } from '../mods';

import Container from './Container';

export default class Implicits extends Container<Mod> {
  /**
   * @override
   */
  addMod(mod: Mod): Implicits {
    if (this.hasRoomFor(mod)) {
      // calling super.addMod will return Container<T> instead of Implicits
      return new Implicits(super.addMod(mod).mods);
    } else {
      return this;
    }
  }

  /**
   * @override
   */
  maxModsOfType(mod: Mod): number {
    switch (mod.props.generation_type) {
      case Mod.TYPE.PREMADE:
        return 5;
      case Mod.TYPE.ENCHANTMENT:
        return 1;
      case Mod.TYPE.VAAL:
        return 1;
      // no other generation types allowed
      default:
        return -1;
    }
  }
}
