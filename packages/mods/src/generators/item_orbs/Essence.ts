import Item from '../../containers/item';
import { ModProps, EssenceProps } from '../../schema';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';
import Mod from '../../mods/Mod';
import { GeneratorDetails } from '../Generator';
import Alchemy from './Alchemy';
import Scouring from './Scouring';

export interface ApplicableFlags extends BaseApplicableFlags {
  wrong_rarity: boolean;
  wrong_itemclass: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

/**
 * Essences guarantee at least exactly one mod depending on itemclass
 * or are not applicable. They should provide a mod for every equipment type.
 */
export default class Essence extends ItemOrb {
  public static build(props: EssenceProps, mods: ModProps[]) {
    return new Essence(props, mods);
  }
  private static reforger = new Scouring();

  public props: EssenceProps;
  private alchemy: Alchemy;

  /**
   *
   * @param props props of a specific essence (contains the guarenteed mod)
   * @param mods mods that are rolled onto the item after th guarenteed is applied
   */
  constructor(props: EssenceProps, mods: ModProps[]) {
    super([]);
    this.alchemy = Alchemy.build(mods);
    this.props = props;
  }

  /**
   *  add the guarenteed mod and fill up the rest like alchemy
   */
  public applyTo(item: Item, options: Partial<{ force: boolean }> = {}): Item {
    const { force = false } = options;
    let new_item = item;

    if (force || !anySet(this.applicableTo(item))) {
      // scour first if this reforges
      if (this.reforges()) {
        // essences ignore meta mods so dont use a scour implementation
        // and just blindly remove mods
        new_item = Essence.reforger.applyTo(new_item, {
          ignore_meta_mods: true,
          force: true,
        });
      }

      // 1. add guarenteed
      const guarenteed = this.chooseMod(new_item);
      if (guarenteed === undefined) {
        throw new Error(
          `'${new_item.baseitem.item_class}' has no guarentedd mod`,
        );
      }
      new_item = new_item.rarity.set('rare').addMod(guarenteed);
      // 2. fill up like alch
      new_item = this.alchemy.applyTo(new_item, { force: true });

      return new_item;
    }

    return new_item;
  }

  /**
   * only one mod per itemclass
   */
  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    const mod = this.chooseMod(item);
    if (mod === undefined) {
      return [];
    }

    return [{ mod, spawnweight: Number.POSITIVE_INFINITY }];
  }

  /**
   * @returns Mod if the itemclass of the Item is eligible
   */
  public chooseMod(item: Item): Mod | undefined {
    return this.modForItemclass(item.baseitem.item_class);
  }

  /**
   *
   * @param itemclass
   * @returns the guaranteed mod for the itemclass
   */
  public modForItemclass(itemclass: string): Mod | undefined {
    const mod_props = this.modPropsFor(itemclass);
    if (mod_props === undefined) {
      return undefined;
    } else {
      return new Mod(mod_props);
    }
  }

  /**
   * applicable if the essence guarantees a mod for the itemclass
   * and the rarity is either white or rare (only if essence can reforge)
   * @param item
   */
  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      wrong_rarity: !item.rarity.isNormal(),
      wrong_itemclass: this.chooseMod(item) === undefined,
    };

    if (this.reforges()) {
      applicable_flags.wrong_rarity =
        applicable_flags.wrong_rarity && !item.rarity.isRare();
    }

    return applicable_flags;
  }

  /**
   * @returns true if the essence can reforge (i.e. reroll) the item
   */
  public reforges(): boolean {
    return this.props.level > 5;
  }

  /**
   * @returns true if the essence is the best of its type
   */
  public isTopTier(): boolean {
    return this.props.level === 7;
  }

  /**
   * mapping from itemclass to mod prop in essence props
   * @param item_class
   */
  private modPropsFor(item_class: string): ModProps | undefined {
    switch (item_class) {
      case 'Amulet':
        return this.props.amulet_mod;
      case 'Belt':
        return this.props.belt_mod;
      case 'Body Armour':
        return this.props.body_armour_mod;
      case 'Boots':
        return this.props.boots_mod;
      case 'Bow':
        return this.props.bow_mod;
      case 'Claw':
        return this.props.claw_mod;
      case 'Dagger':
        return this.props.dagger_mod;
      case 'Gloves':
        return this.props.gloves_mod;
      case 'Helmet':
        return this.props.helmet_mod;
      case 'One Hand Axe':
        return this.props.one_hand_axe_mod;
      case 'One Hand Mace':
        return this.props.one_hand_mace_mod;
      case 'One Hand Sword':
        return this.props.one_hand_sword_mod;
      case 'Thrusting One Hand Sword':
        return this.props.one_hand_thrusting_sword_mod;
      case 'Quiver':
        return this.props.quiver_mod;
      case 'Ring':
        return this.props.ring_mod;
      case 'Sceptre':
        return this.props.sceptre_mod;
      case 'Shield':
        return this.props.shield_mod;
      case 'Staff':
        return this.props.staff_mod;
      case 'Two Hand Axe':
        return this.props.two_hand_axe_mod;
      case 'Two Hand Mace':
        return this.props.two_hand_mace_mod;
      case 'Two Hand Sword':
        return this.props.two_hand_sword_mod;
      case 'Wand':
        return this.props.wand_mod;
      default:
        return undefined;
    }
  }
}
