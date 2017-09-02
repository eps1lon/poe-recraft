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

  options: CraftingBenchOptionsProps[];

  constructor(options: CraftingBenchOptionsProps[]) {
    super(options.map(option => new MasterMod(option.mod, option)));

    this.options = options;
  }

  /**
   *  applies a chosen craftingbenchoption
   */
  applyTo(item: Item, options_index: number): boolean {
    const option = this.options[options_index];

    if (option === undefined) {
      return false;
    } else {
      const mod = this.mods.find(
        mod => mod.props.primary === option.mod.primary
      );

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
