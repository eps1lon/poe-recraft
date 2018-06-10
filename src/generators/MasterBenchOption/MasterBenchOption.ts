import Item from '../../containers/item/Item';
import { CraftingBenchOptionsProps } from '../../schema';

import { Flags, anySet } from '../../util/Flags';
import { filterUndefined } from '../../util/ts';
import { metaMods as META_MODs, Mod } from '../../mods';
import Generator, {
  ModApplicableFlags as BaseModApplicableFlags,
  GeneratorDetails,
} from '../Generator';
import * as actions from './custom_actions';

export interface ModApplicableFlags extends BaseModApplicableFlags {
  no_multimod: boolean;
}
export type ModApplicableFlag = keyof BaseModApplicableFlags;

export interface ApplicableFlags extends Flags {
  wrong_itemclass: boolean;
  socket_limit_exceeded: boolean;
  sockets_unmodified: boolean;
  not_enough_sockets: boolean;
  links_unmodified: boolean;
  no_crafted_mod: boolean;
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
      const { crafting_bench_custom_action: custom_action } = this.props;
      switch (custom_action) {
        case actions.CustomAction.RemoveCraftedMod:
          return this.removeCraftedMod(item);
        case actions.CustomAction.RandomZanaMod:
          return this.applyRandomZanaMod(item);
        case actions.CustomAction.ApplySelf:
          return this.applySelfTo(item);
        default:
          throw new actions.UnrecognizedCustomAction(custom_action);
      }
    }

    // nothing changed
    return item;
  }

  /**
   * Can accept only certain itemclasses and in case of vorici options
   * the option actually has to "make sense" (e.g. not 6link of 4socket)
   */
  public applicableTo(item: Item): ApplicableFlags {
    const { item_classes, sockets, links, socket_colours } = this.props;
    const wrong_itemclass =
      // no item classes means every item is welcome
      item_classes.length > 0 &&
      item_classes.find(
        item_class => item_class === item.baseitem.item_class,
      ) === undefined;

    const socket_limit_exceeded =
      sockets > 0 && sockets > item.sockets.maxSockets();

    const sockets_unmodified = sockets > 0 && sockets === item.sockets.count();

    const not_enough_sockets =
      // more linkes than sockets
      (links > 0 && links > item.sockets.count()) ||
      // more colors thant sockets
      (socket_colours.length > 0 &&
        socket_colours.length >= item.sockets.count());

    const links_unmodified = links > 0 && item.sockets.isLinked(0, links - 1);

    const no_crafted_mod =
      this.isRemoveCraftedModOption() &&
      !item.mods.some(mod => mod.isMasterMod());

    return {
      wrong_itemclass,
      socket_limit_exceeded,
      sockets_unmodified,
      not_enough_sockets,
      links_unmodified,
      no_crafted_mod,
    };
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
      master_mods.find(other => other.props.id === META_MODs.MULTIMOD) ===
      undefined;

    if (master_mods.length > 0 && has_no_multi_mod) {
      applicable_flags.no_multimod = true;
    }

    return applicable_flags;
  }

  public isRemoveCraftedModOption(): boolean {
    return (
      this.props.crafting_bench_custom_action ===
      actions.CustomAction.RemoveCraftedMod
    );
  }

  private removeCraftedMod(item: Item): Item {
    return actions.removeCraftedMods(item);
  }

  private applyRandomZanaMod(item: Item): Item {
    throw new Error('not implemented');
  }

  private applySelfTo(item: Item): Item {
    const { mod, props } = this;

    if (mod != null) {
      return this.applyModTo(item, mod);
    } else if (props.sockets > 0) {
      return this.applySocketChangeTo(item);
    } else if (props.links > 0) {
      return this.applyLinkChangeTo(item);
    } else if (props.socket_colours.length > 0) {
      return this.applySocketColorChangeTo(item);
    } else {
      throw new Error("Don't know what to do with this option.");
    }
  }

  private applyModTo(item: Item, mod: Mod): Item {
    // white gets upgraded to blue
    const crafted_item = item.rarity.isNormal()
      ? item.rarity.set('magic')
      : item;

    if (this.isModApplicableTo(mod, crafted_item)) {
      return crafted_item.addMod(mod);
    }

    // nothing changed
    return item;
  }

  private applySocketChangeTo(item: Item): Item {
    return actions.changeSockets(item, this.props.sockets);
  }

  private applyLinkChangeTo(item: Item): Item {
    return actions.changeLinks(item, this.props.links);
  }

  private applySocketColorChangeTo(item: Item): Item {
    return actions.changeColors(item, this.props.socket_colours);
  }
}
