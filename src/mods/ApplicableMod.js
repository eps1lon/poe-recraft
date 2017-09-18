// @flow
import type { Applicable } from '../interfaces/';
import type { Item } from '../containers/';

import { type Flags } from '../util/Flags';
import Mod from './Mod';
import META_MODS from './meta_mods';

export type ApplicableFlag =
  | 'domain_full'
  | 'already_present'
  | 'wrong_domain'
  | 'lower_ilvl'
  | 'above_lld_level';

export type ApplicableFlags = Flags<ApplicableFlag>;

export default class ApplicableMod extends Mod implements Applicable {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    domain_full: false,
    already_present: false,
    wrong_domain: false,
    lower_ilvl: false,
    above_lld_level: false,
  };

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = { ...ApplicableMod.APPLICABLE_FLAGS };

    if (!item.inDomainOf(this.props.domain)) {
      applicable_flags.wrong_domain = true;
    } else if (!item.hasRoomFor(this)) {
      applicable_flags.domain_full = true;
    }

    if (this.props.level > item.props.item_level) {
      applicable_flags.lower_ilvl = true;
    }

    const correct_groups = item.mods.map(mod => mod.props.correct_group);

    if (correct_groups.indexOf(this.props.correct_group) !== -1) {
      applicable_flags.already_present = true;
    }

    const has_leo_meta_mod =
      item.indexOfModWithPrimary(META_MODS.LLD_MOD) !== -1;

    if (this.requiredLevel() > 28 && has_leo_meta_mod) {
      applicable_flags.above_lld_level = true;
    }

    return applicable_flags;
  }
}
