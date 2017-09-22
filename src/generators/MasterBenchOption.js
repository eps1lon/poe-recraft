// @flow
import type { Item } from '../containers';
import { type Buildable } from '../interfaces';
import { withPrimaryFinder } from '../util/mixins';
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
class MasterBenchOption extends Generator<MasterMod, Item>
  implements Buildable<CraftingBenchOptionsProps> {
  static build(option: CraftingBenchOptionsProps) {
    return new this(option);
  }

  +props: CraftingBenchOptionsProps;

  constructor(option: CraftingBenchOptionsProps) {
    if (option.mod != null) {
      super([new MasterMod(option.mod)]);
    } else {
      super([]);
    }

    (this: any).props = option;
  }

  get mod(): ?MasterMod {
    return this.mods[0];
  }

  /**
   * applies a chosen craftingbenchoption
   * 
   * cant overload extended method. so we have to set the chosen option before
   */
  applyTo(item: Item): Item {
    const { mod } = this;

    /**
       * TODO customactions for no mod
       */
    if (mod != null) {
      // white gets upgraded to blue
      const crafted_item =
        item.props.rarity === 'normal' ? item.setRarity('magic') : item;

      if (this.isModApplicableTo(mod, crafted_item)) {
        return crafted_item.addMod(mod);
      }
    } else {
      throw new Error('customactions are not implemented yet');
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

    const { item_classes } = this.props;

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

export default withPrimaryFinder(MasterBenchOption);
