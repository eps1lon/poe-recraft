// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

import { AbstractMethod } from '../../exceptions/';
import FlagSet from '../FlagSet';
import RollableMod from '../Mod/RollableMod';
import ModGenerator from './';

const filterNone = () => true;

/**
 * abstract representation of ingame currency which only accepts
 * prefixes, suffixes and implicits
 * 
 * TODO:
 * applicableByteHuman
 */
export default class Currency extends ModGenerator<RollableMod> {
  static APPLICABLE_FLAGS = ModGenerator.APPLICABLE_FLAGS.concat(
    'NOT_AN_ITEM',
    'CORRUPTED',
    'MIRRORED'
  );

  // build<T: Currency>(currency: Class<T>): T not working
  static build(
    mods: ModProps[],
    filter: ModProps => boolean = filterNone,
    currency: Class<$Subtype<Currency>>
  ): $Subtype<Currency> {
    const rollable_mods = mods
      .filter(props => props.spawn_weights.length > 0 && filter(props))
      .map(props => new RollableMod(props));

    return new currency(rollable_mods);
  }

  constructor(mods: RollableMod[]) {
    super(mods);

    this.applicable_flags = new FlagSet(Currency.APPLICABLE_FLAGS);
    this.resetApplicable();
  }

  /**
   * maps Mod::applicableTo and Mod::spawnableOn to all available mods
   */
  mapFor(item: Item, success: string[] = []): RollableMod[] {
    return this.getAvailableMods().map(mod => {
      mod.applicableTo(item, success);
      mod.spawnableOn(item);

      return mod;
    });
  }

  /**
   * greps Mod::applicableTo and Mod::spawnableOn to all available mods
   */
  modsFor(item: Item, success: string[] = []): RollableMod[] {
    return this.getAvailableMods().filter(
      mod => mod.applicableTo(item, success) && mod.spawnableOn(item)
    );
  }

  /**
   * currency only applies to items
   */
  applicableTo(item: Item, success: string[] = []): boolean {
    this.resetApplicable();

    if (item.corrupted) {
      this.applicable_flags.enable('CORRUPTED');
    }

    return !FlagSet.flagsBlacklisted(this.applicable_flags, success).anySet();
  }

  name() {
    return 'AbstractCurrency';
  }
}
