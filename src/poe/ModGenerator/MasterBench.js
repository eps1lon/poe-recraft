// @flow
import type Item from '../ModContainer/Item';
import type { CraftingBenchOptionsProps } from '../data/schema';

import MasterMod from '../Mod/MasterMod';
import ModGenerator from './';

/**
 * TODO
 * applicableByteHuman()
 */
export default class MasterBench extends ModGenerator<MasterMod> {
  static build(options: CraftingBenchOptionsProps[], master_primary: number) {
    return new MasterBench(
      options.filter(({ npc_master_key }) => npc_master_key === master_primary)
    );
  }

  chosen_option: ?CraftingBenchOptionsProps;
  options: CraftingBenchOptionsProps[];

  constructor(options: CraftingBenchOptionsProps[]) {
    super(
      options
        .filter(option => option.mod != null)
        .map(option => new MasterMod(option))
    );

    this.options = options;
    this.chosen_option = undefined;
  }

  chooseOption(options_index: number): void {
    const option = this.options[options_index];

    if (option === undefined) {
      throw new RangeError();
    } else {
      this.chosen_option = option;
    }
  }

  applyOptionTo(item: Item, options_index: number): boolean {
    this.chooseOption(options_index);

    return this.applyTo(item);
  }

  /**
   * applies a chosen craftingbenchoption
   * 
   * cant overload extended method. so we have to set the chosen option before
   */
  applyTo(item: Item): boolean {
    const option = this.chosen_option;

    if (option == null) {
      return false;
    } else {
      const mod = this.mods.find(
        mod => option.mod != null && mod.props.primary === option.mod.primary
      );

      /**
       * TODO customactions for no mod
       */
      if (mod === undefined) {
        return false;
      } else {
        const old_rarity = item.rarity;

        // white gets upgraded to blue
        if (old_rarity === 'normal') {
          item.rarity = 'magic';
        }

        if (mod.applicableTo(item)) {
          return item.addMod(mod);
        } else {
          // return to old rarity on failure
          item.rarity = old_rarity;

          return false;
        }
      }
    }
  }

  /**
   * every item is welcome
   */
  applicableTo(item: Item): boolean {
    return true;
  }

  /**
   * greps mod::applicableTo 
   */
  modsFor(item: Item, success: string[] = []): MasterMod[] {
    // simulate blue if white
    const old_rarity = item.rarity;
    if (old_rarity === 'normal') {
      item.rarity = 'magic';
    }

    const mods = this.getAvailableMods().filter(mod => {
      return mod.applicableTo(item, success);
    });

    // reroll
    item.rarity = old_rarity;

    return mods;
  }

  /**
   * map mod::applicableTo
   */
  mapFor(item: Item, success: string[] = []): MasterMod[] {
    // simulate blue if white
    const old_rarity = item.rarity;
    if (old_rarity === 'normal') {
      item.rarity = 'magic';
    }

    const mods = this.getAvailableMods().map(function(mod) {
      mod.applicableTo(item, success);
      return mod;
    });

    // reroll
    item.rarity = old_rarity;

    return mods;
  }

  name(): string {
    return this.options[0].npc_master.npc.short_name;
  }
}
