// @flow
import type Item from '../ModContainer/Item';
import type { CraftingBenchOptionsProps, ModProps } from '../data/schema';

import FlagSet from '../FlagSet';
import Mod from '../Mod/';
import ApplicableMod from '../Mod/ApplicableMod';
import MasterMod from '../Mod/MasterMod';
import RollableMod from '../Mod/RollableMod';
import ModGenerator from './';
import Talisman from './Talisman';
import Transmute from './Transmute';
import Vaal from './Vaal';

export type ShowcaseMod = ApplicableMod | RollableMod | MasterMod;

/**
 * Masterbench/Currency hybrid
 * TODO:
 * applicableByteHuman
 */
export default class ItemShowcase extends ModGenerator<ShowcaseMod> {
  static modFilter(mod: ModProps): boolean {
    return (
      Talisman.modFilter(mod) || Transmute.modFilter(mod) || Vaal.modFilter(mod)
    );
  }

  static build(
    props: ModProps[],
    options: CraftingBenchOptionsProps[]
  ): ItemShowcase {
    const mods = props.filter(ItemShowcase.modFilter).map(props => {
      if (props.generation_type === Mod.TYPE.TALISMAN) {
        return new ApplicableMod(props);
      } else if (props.domain === Mod.DOMAIN.MASTER) {
        return MasterMod.build(props, options);
      } else if (props.spawn_weights.length > 0) {
        return new RollableMod(props);
      } else {
        throw new Error(`could not build mod for ${props.primary}`);
      }
    });

    return new ItemShowcase(mods);
  }

  /**
   * only abstract showcase, not for actual usage
   */
  applyTo(item: Item) {
    return false;
  }

  /**
   * maps mod::applicableTo and (if implemented) mod::spawnableOn 
   * if we have all the space for mods we need
   */
  mapFor(item: Item, success: string[] = []): ShowcaseMod[] {
    // simulate showcase
    const old_rarity = item.rarity;
    item.rarity = 'showcase';

    const mods = this.getAvailableMods().filter(mod => {
      mod.applicableTo(item, success);

      if (mod instanceof RollableMod) {
        mod.spawnableOn(item, success);
      }

      // vaals replace so we dont care about full or not
      if (mod.isType('vaal')) {
        mod.applicable_flags.disable('DOMAIN_FULL');
      }

      return mod;
    });

    item.rarity = old_rarity;
    return mods;
  }

  /**
   * greps mod::applicableTo and (if implemented) mod::spawnableOn 
   * if we have all the space for mods we need
   */
  modsFor(item: Item, success: string[] = []): ShowcaseMod[] {
    // simulate showcase
    const old_rarity = item.rarity;
    item.rarity = 'showcase';

    const mods = this.getAvailableMods().filter(mod => {
      const is_applicable = mod.applicableTo(item, success);

      // dont care if mod is no RollableMod
      let is_spawnable = true;
      if (mod instanceof RollableMod) {
        is_spawnable = mod.spawnableOn(item);
      }

      if (is_applicable && is_spawnable) {
        // vaals replace so we dont care about full or not
        if (mod.isType('vaal')) {
          mod.applicable_flags.disable('DOMAIN_FULL');
        }

        return true;
      } else {
        return false;
      }
    });

    return mods;
  }

  name() {
    return 'Item Showcase';
  }
}
