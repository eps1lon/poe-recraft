// @flow
import { Mod } from '../mods/';

import { Container } from './';

export default class ItemImplicits extends Container {
  /**
   * @override
   */
  addMod(mod: Mod) {
    if (this.hasRoomFor(mod)) {
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
      default:
        return -1;
    }
  }
}
