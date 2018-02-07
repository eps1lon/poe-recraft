import Item from '../containers/item/Item';
import MasterBench from '../helpers/MasterBench';
import Mod from '../mods/Mod';
import { CraftingBenchOptionsProps, ModProps } from '../schema';

import Generator, { GeneratorDetails } from './Generator';
import Alchemy from './item_orbs/Alchemy';
import EnchantmentBench from './item_orbs/EnchantmentBench';
import Vaal from './item_orbs/Vaal';
import { Flags } from '../util/Flags';

/**
 * Masterbench/Currency hybrid
 */
export default class ItemShowcase extends Generator<Mod, Item> {
  enchantment: EnchantmentBench;
  master: MasterBench;
  explicits: Alchemy;
  vaal: Vaal;

  constructor(props: ModProps[], options: CraftingBenchOptionsProps[]) {
    const enchantment = EnchantmentBench.build(props);
    const master = MasterBench.build(options);
    const explicits = Alchemy.build(props);
    const vaal = Vaal.build(props);

    const mods = [
      ...enchantment.mods,
      ...explicits.mods,
      ...vaal.mods,
      ...master.getAvailableMods(),
    ];

    super(mods);

    this.enchantment = enchantment;
    this.master = master;
    this.explicits = explicits;
    this.vaal = vaal;
  }

  /**
   * only abstract showcase, not for actual usage
   */
  applyTo(item: Item) {
    return item;
  }

  /**
   * not applicable to anything
   * @param item 
   */
  applicableTo(item: Item): Flags {
    return {
      applicable: false,
    } as Flags;
  }

  /**
   * greps mod::applicableTo and (if implemented) mod::spawnableOn 
   * if we have all the space for mods we need
   */
  modsFor(item: Item, whitelist: string[] = []) {
    const details = [
      ...this.master.modsFor(item, whitelist),
      ...this.enchantment.modsFor(item, whitelist),
      ...this.explicits.modsFor(item, whitelist),
      ...this.vaal.modsFor(item, whitelist),
    ];

    // flow cant merge object types
    // { mod: OneMod, prop: number } | { mod: AnotherMod, prop: number }
    // will not become { mod: OneMod | AnotherMod, prop: number }
    // and for some reason ['a', 'b'] cant be cast to Array<number | string>
    return details;
  }
}
