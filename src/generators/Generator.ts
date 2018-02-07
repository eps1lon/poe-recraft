import { Container } from '../containers/Container';
import Mod from '../mods/Mod';
import META_MODS from '../mods/meta_mods';

import { Flags, anySet } from '../util/Flags';

export type GeneratorDetails<M extends Mod> = {
  mod: M;
  applicable?: Flags;
  spawnable?: Flags;
  spawnweight?: number;
};

export interface ModApplicableFlags extends Flags {
  domain_full: boolean;
  already_present: boolean;
  wrong_domain: boolean;
  lower_ilvl: boolean;
  above_lld_level: boolean;
}
export type ModApplicableFlag = keyof ModApplicableFlags;

/**
 * @abstract
 */
export default abstract class Generator<
  M extends Mod,
  C extends Container<any>
> {
  mods: M[];

  constructor(mods: M[]) {
    this.mods = mods;
  }

  abstract applyTo(container: C): C;

  abstract modsFor(container: C, whitelist: string[]): GeneratorDetails<M>[];

  abstract applicableTo(container: C): Flags;

  /**
   * returns a copy of #mods
   * 
   * we can stick with a shallow copy since Mod are supposed to be immutable
   */
  getAvailableMods(): M[] {
    return this.mods.slice();
  }

  // eslint-disable-next-line no-unused-vars
  isApplicableTo(container: C, whitelist: string[] = []): boolean {
    return !anySet(this.applicableTo(container), whitelist);
  }

  isModApplicableTo(mod: M, container: C): ModApplicableFlags {
    const applicable_flags: ModApplicableFlags = {
      domain_full: false,
      already_present: false,
      wrong_domain: false,
      lower_ilvl: false,
      above_lld_level: false,
    };

    if (!container.inDomainOf(mod.props.domain)) {
      applicable_flags.wrong_domain = true;
    } else if (!container.hasRoomFor(mod)) {
      applicable_flags.domain_full = true;
    }

    if (mod.props.level > container.level()) {
      applicable_flags.lower_ilvl = true;
    }

    if (container.hasModGroup(mod)) {
      applicable_flags.already_present = true;
    }

    const has_leo_meta_mod =
      container.indexOfModWithPrimary(META_MODS.LLD_MOD) !== -1;

    if (mod.requiredLevel() > 28 && has_leo_meta_mod) {
      applicable_flags.above_lld_level = true;
    }

    return applicable_flags;
  }
}
