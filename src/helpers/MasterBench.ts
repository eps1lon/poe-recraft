import Item from '../containers/item/Item';
import MasterBenchOption from '../generators/MasterBenchOption';
import { CraftingBenchOptionsProps } from '../schema';

import { Mod } from '../mods';
import { GeneratorDetails } from '../generators/Generator';

type OptionId = number;

/**
 */
export default class MasterBench {
  public static build(
    props: CraftingBenchOptionsProps[],
    master_primary?: number,
  ) {
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

  public readonly options: MasterBenchOption[];

  constructor(options: MasterBenchOption[]) {
    this.options = options;
  }

  public applyOptionTo(item: Item, option_id: OptionId): Item {
    const option = this.options.find(
      other => other.props.primary === option_id,
    );

    if (option === undefined) {
      throw new Error(`option '${option_id}' not found`);
    }

    return option.applyTo(item);
  }

  public getAvailableMods(): Mod[] {
    return this.options
      .map(({ mod }) => mod)
      .filter((mod): mod is Mod => mod !== undefined);
  }

  /**
   * greps mod::applicableTo 
   */
  public modsFor(item: Item, whitelist: string[] = []) {
    return this.options.reduce(
      (mods, option) => mods.concat(option.modsFor(item, whitelist)),
      [] as Array<GeneratorDetails<Mod>>,
    );
  }
}
