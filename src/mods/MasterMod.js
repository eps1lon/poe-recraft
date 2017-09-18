// @flow
import type { CraftingBenchOptionsProps, ModProps } from '../schema';
import type { Item } from '../containers/';
import type { Flags } from '../util/Flags';

import ApplicableMod, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ApplicableMod';
import { metaMods as META_MODs } from './';

export class OptionNotFound extends Error {
  // cra doesnt have babel-plugin-transform-builtin-extend which can cause
  // tricky edge cases so we stick with duck typing
  static type = 'OptionNotFound';
  type = OptionNotFound.type;

  constructor(mod: ModProps) {
    super(`option not found for mod ${mod.primary}`);
  }
}

export type ApplicableFlag =
  | BaseApplicableFlag
  | 'wrong_itemclass'
  | 'no_multimod';

export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

/**
 * TODO
 * serialize()
 * applicableByteHuman
 */
export default class MasterMod extends ApplicableMod {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    ...ApplicableMod.APPLICABLE_FLAGS,
    wrong_itemclass: false,
    no_multimod: false,
  };

  static build(mod: ModProps, options: CraftingBenchOptionsProps[]): MasterMod {
    const option = options.find(
      needle => needle.mod != null && needle.mod.primary === mod.primary,
    );

    if (option === undefined) {
      throw new OptionNotFound(mod);
    }

    return new MasterMod(option);
  }

  +option: CraftingBenchOptionsProps;

  constructor(option: CraftingBenchOptionsProps) {
    if (option.mod == null) {
      throw new Error('the provided option doesnt have a mod');
    }

    super(option.mod);

    // we need the benchoption here because it holds the info for the
    // applicable itemclass
    // Covariant property `option` incompatible with contravariant use in
    (this: any).option = option;
  }

  /**
   * modname with basic stats
   */
  name() {
    const { master_level, npc_master: { npc: { short_name } } } = this.option;

    return `${this.props.name}(${short_name}) Level: ${master_level}`;
  }

  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      wrong_itemclass: false,
      no_multimod: false,
    };

    const { item_classes } = this.option;

    const no_matching_item_class =
      item_classes.find(
        item_class => item_class.primary === item.baseitem.item_class.primary,
      ) === undefined;

    if (no_matching_item_class) {
      applicable_flags.wrong_itemclass = true;
    }

    // grep MasterMods and set failure if we cant multimod
    const master_mods = item.mods.filter(mod => mod instanceof MasterMod);
    const has_no_multi_mod =
      master_mods.find(mod => mod.props.primary === META_MODs.MULTIMOD) ===
      undefined;

    if (master_mods.length > 0 && has_no_multi_mod) {
      applicable_flags.no_multimod = true;
    }

    return applicable_flags;
  }
}
