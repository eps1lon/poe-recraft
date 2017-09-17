// @flow
import type { Item } from '../containers/';
import type { CraftingBenchOptionsProps } from '../data/schema';

import { anySet } from '../Flags';
import { MasterMod } from '../mods/';
import Generator from './Generator';

/**
 * TODO
 * applicableByteHuman()
 */
export default class MasterBench extends Generator<MasterMod> {
  static build(options: CraftingBenchOptionsProps[], master_primary: number) {
    return new MasterBench(
      options.filter(({ npc_master_key }) => npc_master_key === master_primary),
    );
  }

  chosen_option: ?CraftingBenchOptionsProps;
  options: CraftingBenchOptionsProps[];

  constructor(options: CraftingBenchOptionsProps[]) {
    super(
      options
        .filter(option => option.mod != null)
        .map(option => new MasterMod(option)),
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

  applyOptionTo(item: Item, options_index: number): Item {
    this.chooseOption(options_index);

    return this.applyTo(item);
  }

  /**
   * applies a chosen craftingbenchoption
   * 
   * cant overload extended method. so we have to set the chosen option before
   */
  applyTo(item: Item): Item {
    const option = this.chosen_option;

    if (option != null) {
      const mod = this.mods.find(
        needle =>
          option.mod != null && needle.props.primary === option.mod.primary,
      );

      /**
       * TODO customactions for no mod
       */
      if (mod !== undefined) {
        // white gets upgraded to blue
        const crafted_item =
          item.props.rarity === 'normal' ? item.setRarity('magic') : item;

        if (mod.applicableTo(crafted_item)) {
          return crafted_item.addMod(mod);
        }
      }
    }

    // nothing changed
    return item;
  }

  /**
   * every item is welcome
   */
  // eslint-disable-next-line no-unused-vars
  applicableTo(item: Item) {
    // empty flags
    return {};
  }

  /**
   * greps mod::applicableTo 
   */
  modsFor(item: Item, whitelist: string[] = []) {
    // TODO look into why we simulate another rarity why is a MasterMod not
    // applicable to white items?
    // simulate blue if white
    const simulated_item =
      item.props.rarity === 'normal' ? item.setRarity('magic') : item;

    return this.getAvailableMods()
      .map(mod => {
        const applicable_flags = mod.applicableTo(simulated_item);

        if (anySet(applicable_flags, whitelist)) {
          return null;
        } else {
          return {
            mod,
            applicable: applicable_flags,
          };
        }
      })
      .filter(Boolean);
  }
}
