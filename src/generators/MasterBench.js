// @flow
import type { Item } from '../containers';
import type { CraftingBenchOptionsProps } from '../schema';

import { type Flags, anySet } from '../util/Flags';
import { MasterMod, metaMods as META_MODs } from '../mods';

import Generator, {
  type ModApplicableFlag as BaseModApplicableFlag,
  type ModApplicableFlags as BaseModApplicableFlags,
} from './Generator';

export type ModApplicableFlag =
  | BaseModApplicableFlag
  | 'wrong_itemclass'
  | 'no_multimod';
export type ModApplicableFlags =
  | BaseModApplicableFlags
  | Flags<ModApplicableFlag>;

/**
 */
export default class MasterBench extends Generator<MasterMod, Item> {
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

        if (this.isModApplicableTo(mod, crafted_item)) {
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
        const applicable_flags = this.isModApplicableTo(mod, simulated_item);

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

  isModApplicableTo(mod: MasterMod, item: Item): ModApplicableFlags {
    const applicable_flags = {
      ...super.isModApplicableTo(mod, item),
      wrong_itemclass: false,
      no_multimod: false,
    };

    const { item_classes } = mod.option;

    const no_matching_item_class =
      item_classes.find(
        item_class => item_class.primary === item.baseitem.item_class.primary,
      ) === undefined;

    if (no_matching_item_class) {
      applicable_flags.wrong_itemclass = true;
    }

    // grep MasterMods and set failure if we cant multimod
    const master_mods = item.mods.filter(other => other instanceof MasterMod);
    const has_no_multi_mod =
      master_mods.find(other => other.props.primary === META_MODs.MULTIMOD) ===
      undefined;

    if (master_mods.length > 0 && has_no_multi_mod) {
      applicable_flags.no_multimod = true;
    }

    return applicable_flags;
  }
}
