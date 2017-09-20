// @flow
import type { Item } from '../../containers';
import { Mod } from '../../mods';
import { type Flags } from '../../util/Flags';

import Orb from '../Orb';

export type ApplicableFlag = 'corrupted' | 'mirrored';
export type ApplicableFlags = Flags<ApplicableFlag>;

export default class ItemOrb extends Orb<Mod, Item> {
  /**
   * currency only applies to items
   */
  applicableTo(item: Item): ApplicableFlags {
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
