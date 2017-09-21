// @flow
import type { CraftingBenchOptionsProps, ModProps } from '../schema';

import Mod from './Mod';

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
export default class MasterMod extends Mod {
  static option_props_list: ?(CraftingBenchOptionsProps[]);

  static build(mod: ModProps): MasterMod {
    if (this.option_props_list == null) {
      throw new Error(`${String(this.name)} option props list not set`);
    }

    const option = this.option_props_list.find(
      needle => needle.mod != null && needle.mod.primary === mod.primary,
    );

    if (option === undefined) {
      throw new OptionNotFound(mod);
    }

    return new this(option);
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
}
