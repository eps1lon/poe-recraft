import Item from '../containers/item/Item';
import MasterBench from '../helpers/MasterBench';
import Mod from '../mods/Mod';
import { CraftingBenchOptionsProps, EssenceProps, ModProps } from '../schema';

import Generator, { GeneratorDetails } from './Generator';
import { Alchemy, EnchantmentBench, Essence, Vaal } from './item_orbs';
import { Flags } from '../util/Flags';

/**
 * Masterbench/Currency hybrid
 */
export default class ItemShowcase extends Generator<Mod, Item> {
  public enchantment: EnchantmentBench;
  public master: MasterBench;
  public explicits: Alchemy;
  public vaal: Vaal;

  private essences: EssenceProps[];

  constructor(
    props: ModProps[],
    options: CraftingBenchOptionsProps[],
    essences: EssenceProps[],
  ) {
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

    this.essences = essences;
  }

  /**
   * only abstract showcase, not for actual usage
   */
  public applyTo(item: Item) {
    return item;
  }

  /**
   * not applicable to anything
   * @param item
   */
  public applicableTo(item: Item): Flags {
    return {
      not_applicable: true,
    } as Flags;
  }

  /**
   * greps mod::applicableTo and (if implemented) mod::spawnableOn
   * if we have all the space for mods we need
   *
   * @returns master-, enchantment-, vaal-, explicit-, (top tier) essence-mods
   */
  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    const details = [
      ...this.master.modsFor(item, whitelist),
      ...this.enchantment.modsFor(item, whitelist),
      ...this.explicits.modsFor(item, whitelist),
      ...this.vaal.modsFor(item, whitelist),
      ...this.essences
        .map(props => {
          const essence = new Essence(props, []);
          if (essence.isTopTier()) {
            return essence.chooseMod(item);
          } else {
            return undefined;
          }
        })
        .filter(
          (mod): mod is Mod => {
            return mod !== undefined;
          },
        )
        .map(mod => ({ mod })),
    ];

    // flow cant merge object types
    // { mod: OneMod, prop: number } | { mod: AnotherMod, prop: number }
    // will not become { mod: OneMod | AnotherMod, prop: number }
    // and for some reason ['a', 'b'] cant be cast to Array<number | string>
    return details;
  }
}
