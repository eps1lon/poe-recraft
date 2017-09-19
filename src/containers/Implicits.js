// @flow
import { Mod } from '../mods';

import Container, { type Builder } from './Container';

export default class Implicits extends Container<Mod, Builder<Mod>> {
  /**
   * @override
   */
  addMod(mod: Mod): this {
    if (this.hasRoomFor(mod)) {
      // calling super.addMod will return Container<T> instead of Implicits
      return super.addMod(mod);
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
