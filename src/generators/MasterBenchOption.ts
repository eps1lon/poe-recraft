import Item from '../containers/item/Item';
import { CraftingBenchOptionsProps } from '../schema';

import { Flags, anySet } from '../util/Flags';
import { filterUndefined } from '../util/ts';
import { metaMods as META_MODs, Mod } from '../mods';

import Generator, {
  ModApplicableFlags as BaseModApplicableFlags,
  GeneratorDetails,
} from './Generator';

export interface ModApplicableFlags extends BaseModApplicableFlags {
  no_multimod: boolean;
}
export type ModApplicableFlag = keyof BaseModApplicableFlags;

export interface ApplicableFlags extends Flags {
  wrong_itemclass: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class MasterBenchOption extends Generator<Mod, Item> {
  public static build(option: CraftingBenchOptionsProps) {
    return new MasterBenchOption(option);
  }

  public readonly props: CraftingBenchOptionsProps;

  constructor(option: CraftingBenchOptionsProps) {
    if (option.mod != null) {
      super([new Mod(option.mod)]);
    } else {
      super([]);
    }

    this.props = option;
  }

  get mod(): Mod | undefined {
    return this.mods[0];
  }

  /**
   * applies a chosen craftingbenchoption
   * 
   * cant overload extended method. so we have to set the chosen option before
   */
  public applyTo(item: Item): Item {
    if (this.isApplicableTo(item)) {
      const { mod } = this;

      /**
       * TODO customactions for no mod
       */
      if (mod != null) {
        // white gets upgraded to blue
        const crafted_item = item.rarity.isNormal()
          ? item.rarity.set('magic')
          : item;

        if (this.isModApplicableTo(mod, crafted_item)) {
          return crafted_item.addMod(mod);
        }
      } else {
        throw new Error('customactions are not implemented yet');
      }
    }

    // nothing changed
    return item;
  }

  /**
   * every item is welcome
   */
  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      wrong_itemclass: false,
    };
    const { item_classes } = this.props;

    applicable_flags.wrong_itemclass =
      item_classes.find(
        item_class => item_class.primary === item.baseitem.item_class.primary,
      ) === undefined;

    return applicable_flags;
  }

  /**
   * greps mod::applicableTo 
   */
  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    // TODO look into why we simulate another rarity why is a MasterMod not
    // applicable to white items?
    // simulate blue if white
    const simulated_item = item.rarity.isNormal()
      ? item.rarity.set('magic')
      : item;

    return this.getAvailableMods()
      .map(mod => {
        const applicable_flags = {
          ...this.isModApplicableTo(mod, simulated_item),
          ...this.applicableTo(simulated_item),
        };

        if (anySet(applicable_flags, whitelist)) {
          return null;
        } else {
          return {
            mod,
            applicable: applicable_flags,
          };
        }
      })
      .filter(filterUndefined);
  }

  /**
   * checks if the given mod is applicable to the item
   * 
   * remember that this doesn't check if the passed mod is the mod of this option
   */
  public isModApplicableTo(mod: Mod, item: Item): ModApplicableFlags {
    const applicable_flags = {
      ...super.isModApplicableTo(mod, item),
      no_multimod: false,
    };

    // grep MasterMods and set failure if we cant multimod
    const master_mods = item.mods.filter(other => other.isMasterMod());
    const has_no_multi_mod =
      master_mods.find(other => other.props.primary === META_MODs.MULTIMOD) ===
      undefined;

    if (master_mods.length > 0 && has_no_multi_mod) {
      applicable_flags.no_multimod = true;
    }

    return applicable_flags;
  }
}
