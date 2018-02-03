// @flow
import type Item from '../containers/item/Item';
import type { CraftingBenchOptionsProps } from '../schema';

import { type Flags, anySet } from '../util/Flags';
import { metaMods as META_MODs, Mod } from '../mods';

import Generator, {
  type ModApplicableFlag as BaseModApplicableFlag,
  type ModApplicableFlags as BaseModApplicableFlags,
} from './Generator';

export type ModApplicableFlag = BaseModApplicableFlag | 'no_multimod';
export type ModApplicableFlags =
  | BaseModApplicableFlags
  | Flags<ModApplicableFlag>;

export type ApplicableFlag = 'wrong_itemclass';
export type ApplicableFlags = Flags<ApplicableFlag>;

/**
 */
export default class MasterBenchOption extends Generator<Mod, Item> {
  static build(option: CraftingBenchOptionsProps) {
    return new MasterBenchOption(option);
  }

  +props: CraftingBenchOptionsProps;

  constructor(option: CraftingBenchOptionsProps) {
    if (option.mod != null) {
      super([new Mod(option.mod)]);
    } else {
      super([]);
    }

    (this: any).props = option;
  }

  // $FlowFixMe Mod is designed about having no side-effects
  get mod(): ?Mod {
    return this.mods[0];
  }

  /**
 * applies a chosen craftingbenchoption
 * 
 * cant overload extended method. so we have to set the chosen option before
 */
  applyTo(item: Item): Item {
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
  applicableTo(item: Item): ApplicableFlags {
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
  modsFor(item: Item, whitelist: string[] = []) {
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
      .filter(Boolean);
  }

  /**
 * checks if the given mod is applicable to the item
 * 
 * remember that this doesn't check if the passed mod is the mod of this option
 */
  isModApplicableTo(mod: Mod, item: Item): ModApplicableFlags {
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
