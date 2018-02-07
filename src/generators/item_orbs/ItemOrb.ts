import Item from '../../containers/item';
import { Flags } from '../../util/Flags';

import Orb from '../Orb';

export interface ApplicableFlags extends Flags {
  corrupted: boolean;
  mirrored: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default abstract class ItemOrb extends Orb<Item> {
  /**
   * currency only applies to items
   */
  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      corrupted: false,
      mirrored: false,
    };

    if (item.props.corrupted) {
      applicable_flags.corrupted = true;
    }

    if (item.props.mirrored) {
      applicable_flags.mirrored = true;
    }

    return applicable_flags;
  }
}
