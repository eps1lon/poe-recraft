// @flow
import type { Item } from '../containers/';
import type { CraftingBenchOptionsProps, ModProps } from '../schema';

import { ApplicableMod, MasterMod, RollableMod } from '../mods/';
import Generator from './Generator';
import MasterBench from './MasterBench';
import Talisman from './Talisman';
import Transmute from './Transmute';
import Vaal from './Vaal';

export type ShowcaseMod = ApplicableMod | RollableMod | MasterMod;

/**
 * Masterbench/Currency hybrid
 */
export default class ItemShowcase extends Generator<ShowcaseMod> {
  master: MasterBench;
  talisman: Talisman;
  transmute: Transmute;
  vaal: Vaal;

  constructor(props: ModProps[], options: CraftingBenchOptionsProps[]) {
    const master = new MasterBench(options);
    const talisman = Talisman.build(props);
    const transmute = Transmute.build(props);
    const vaal = Vaal.build(props);

    const mods = [
      ...talisman.mods,
      ...transmute.mods,
      ...vaal.mods,
      ...master.mods,
    ];

    super(mods);

    this.master = master;
    this.talisman = talisman;
    this.transmute = transmute;
    this.vaal = vaal;
  }

  /**
   * only abstract showcase, not for actual usage
   */
  applyTo(item: Item) {
    return item;
  }

  /**
   * greps mod::applicableTo and (if implemented) mod::spawnableOn 
   * if we have all the space for mods we need
   */
  modsFor(item: Item, whitelist: string[] = []) {
    return [
      ...this.master.modsFor(item, whitelist),
      ...this.talisman.modsFor(item, whitelist),
      ...this.transmute.modsFor(item, whitelist),
      ...this.vaal.modsFor(item, whitelist),
    ];
  }
}
