// @flow
import type { Item } from '../containers';
import { MasterBenchOption } from '../generators';
import type { CraftingBenchOptionsProps } from '../schema';

import { anySet } from '../util/Flags';
import { MasterMod } from '../mods';

type OptionId = number;

/**
 */
export default class MasterBench {
  static build(props: CraftingBenchOptionsProps[], master_primary: ?number) {
    const options = props.filter(
      ({ npc_master_key }) =>
        // master_primary != null implies master_primary === npc_master_key
        master_primary == null || npc_master_key === master_primary,
    );

    if (options.length <= 0) {
      throw new Error(`no options found for '${String(master_primary)}'`);
    }

    // TODO allow customactions
    return new MasterBench(
      options
        .filter(({ mod }) => mod != null)
        .map(option => new MasterBenchOption(option)),
    );
  }

  +options: MasterBenchOption[];

  constructor(options: MasterBenchOption[]) {
    (this: any).options = options;
  }

  applyOptionTo(item: Item, option_id: OptionId): Item {
    const option = this.options.find(
      other => other.props.primary === option_id,
    );

    if (option === undefined) {
      throw new Error(`option '${option_id}' not found`);
    }

    return option.applyTo(item);
  }

  getAvailableMods(): MasterMod[] {
    return this.options.map(({ mod }) => mod).filter(Boolean);
  }

  /**
   * greps mod::applicableTo 
   */
  modsFor(item: Item, whitelist: string[] = []) {
    return this.options.reduce(
      (mods, option) => mods.concat(option.modsFor(item, whitelist)),
      [],
    );
  }
}
