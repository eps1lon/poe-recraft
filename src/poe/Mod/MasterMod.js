// @flow
import type { CraftingBenchOptionsProps, ModProps } from '../data/schema';
import type Item from '../ModContainer/Item';

import ApplicableMod from './ApplicableMod';
import FlagSet from '../FlagSet';
import META_MODs from '../Mod/meta_mods';

export class OptionNotFound extends Error {
  // cra doesnt have babel-plugin-transform-builtin-extend which can cause
  // tricky edge cases so we stick with duck typing
  static type = 'OptionNotFound';
  type = OptionNotFound.type;

  constructor(mod: ModProps) {
    super(`option not found for mod ${mod.primary}`);
  }
}

/**
 * TODO
 * serialize()
 * applicableByteHuman
 */
export default class MasterMod extends ApplicableMod {
  static APPLICABLE_FLAGS = ApplicableMod.APPLICABLE_FLAGS.concat(
    'WRONG_ITEMCLASS',
    'NO_MULTIMOD'
  );

  static build(mod: ModProps, options: CraftingBenchOptionsProps[]): MasterMod {
    const option = options.find(
      option => option.mod != null && option.mod.primary === mod.primary
    );

    if (option === undefined) {
      throw new OptionNotFound(mod);
    }

    return new MasterMod(option);
  }

  option: CraftingBenchOptionsProps;

  constructor(option: CraftingBenchOptionsProps) {
    if (option.mod == null) {
      throw new Error('the provided option doesnt have a mod');
    }

    super(option.mod);

    // we need the benchoption here because it holds the info for the
    // applicable itemclass
    this.option = option;

    // extend ApplicableMod initial applicable flags
    this.applicable_flags = new FlagSet(MasterMod.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   * modname with basic stats
   */
  name() {
    const { master_level, npc_master: { npc: { short_name } } } = this.option;

    return `${this.props.name}(${short_name}) Level: ${master_level}`;
  }

  applicableTo(item: Item, success: string[] = []): boolean {
    super.applicableTo(item, success);

    const { item_classes } = this.option;

    const no_matching_item_class =
      item_classes.find(
        item_class => item_class.primary === item.props.item_class.primary
      ) === undefined;

    if (no_matching_item_class) {
      this.applicable_flags.enable('WRONG_ITEMCLASS');
    }

    // grep MasterMods and set failure if we cant multimod
    const master_mods = item.mods.filter(mod => mod instanceof MasterMod);
    const has_no_multi_mod =
      master_mods.find(mod => mod.props.primary === META_MODs.MULTIMOD) ===
      undefined;

    if (master_mods.length > 0 && has_no_multi_mod) {
      this.applicable_flags.enable('NO_MULTIMOD');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }
}
