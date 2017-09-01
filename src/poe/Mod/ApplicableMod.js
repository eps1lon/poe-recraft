// @flow
import type { Applicable } from '../interfaces/';
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

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

  applicable_flags: FlagSet;

  constructor(props: ModProps) {
    super(props);

    this.applicable_flags = new FlagSet(ApplicableMod.APPLICABLE_FLAGS);
  }

  applicableTo(item: Item, success: string[]): boolean {
    // reset
    this.resetApplicable();

    if (!item.inDomainOf(this.props.domain)) {
      this.applicable_flags.enable('WRONG_DOMAIN');
    } else if (!item.hasRoomFor(this)) {
      this.applicable_flags.enable('DOMAIN_FULL');
    }

    if (this.props.level > item.item_level) {
      this.applicable_flags.enable('LOWER_ILVL');
    }

    const correct_groups = item.mods.map(mod => mod.props.correct_group);

    if (correct_groups.indexOf(this.props.correct_group) !== -1) {
      this.applicable_flags.enable('ALREADY_PRESENT');
    }

    const has_leo_meta_mod =
      item.indexOfModWithPrimary(META_MODS.LLD_MOD) !== -1;

    if (this.props.level > 28 && has_leo_meta_mod) {
      this.applicable_flags.enable('ABOVE_LLD_LEVEL');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  applicableCached(): boolean {
    return !this.applicable_flags.anySet();
  }

  resetApplicable(): void {
    this.applicable_flags.reset();
  }
}
