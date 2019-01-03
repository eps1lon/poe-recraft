import Item from '../../containers/item';
import { Flags } from '../../util/Flags';

import Orb, { ModApplicableFlags } from '../Orb';
import { Mod } from '../../mods';

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

  /**
   * master mods are not applicable via ItemOrb
   *
   * @param mod
   * @param item
   */
  public isModApplicableTo(mod: Mod, item: Item): ModApplicableFlags {
    const { wrong_domain, ...flags } = super.isModApplicableTo(mod, item);

    return {
      ...flags,
      wrong_domain: wrong_domain || mod.props.domain === Mod.DOMAIN.MASTER,
    };
  }
}
