// @flow
import type { Applicable } from '../interfaces/';
import type Item from '../ModContainer/Item';

import FlagSet from '../FlagSet';
import META_MODS from './meta_mods';
import Mod from './';

export default class ApplicableMod extends Mod implements Applicable {
  static APPLICABLE_FLAGS = [
    'DOMAIN_FULL',
    'ALREADY_PRESENT',
    'WRONG_DOMAIN',
    'LOWER_ILVL',
    'ABOVE_LLD_LEVEL'
  ];

  applicableTo(item: Item): FlagSet {
    const applicable_flags = new FlagSet(ApplicableMod.APPLICABLE_FLAGS);

    if (!item.inDomainOf(this.props.domain)) {
      applicable_flags.enable('WRONG_DOMAIN');
    } else if (!item.hasRoomFor(this)) {
      applicable_flags.enable('DOMAIN_FULL');
    }

    if (this.props.level > item.props.item_level) {
      applicable_flags.enable('LOWER_ILVL');
    }

    const correct_groups = item.mods.map(mod => mod.props.correct_group);

    if (correct_groups.indexOf(this.props.correct_group) !== -1) {
      applicable_flags.enable('ALREADY_PRESENT');
    }

    const has_leo_meta_mod =
      item.indexOfModWithPrimary(META_MODS.LLD_MOD) !== -1;

    if (this.props.level > 28 && has_leo_meta_mod) {
      applicable_flags.enable('ABOVE_LLD_LEVEL');
    }

    return applicable_flags;
  }
}
