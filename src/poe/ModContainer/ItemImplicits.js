// @flow
import Mod from '../Mod/';

import ModContainer from './';

export default class ItemImplicits extends ModContainer {
  /**
   * @override
   */
  addModd(mod: Mod) {
    if (this.hasRoomFor(mod)) {
      return super.addModd(mod);
    } else {
      return false;
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
