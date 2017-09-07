// @flow
import type Item from '../ModContainer/Item';
import type { ModProps } from '../data/schema';

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

  modsFor(item: Item, whitelist: string[] = []) {
    return this.getAvailableMods()
      .map(mod => {
        const applicable_flags = mod.applicableTo(item);
        const spawnable_flags = mod.spawnableOn(item);
        const spawnweight = mod.spawnweightFor(item);

        const is_applicable = !FlagSet.flagsBlacklisted(
          applicable_flags,
          whitelist
        ).anySet();

        const is_spawnable = !FlagSet.flagsBlacklisted(
          spawnable_flags,
          whitelist
        ).anySet();

        const is_rollable = is_applicable && is_spawnable && spawnweight > 0;

        if (is_rollable) {
          return {
            mod,
            applicable: applicable_flags,
            spawnable: spawnable_flags,
            spawnweight: spawnweight
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
  }

  /**
   * currency only applies to items
   */
  applicableTo(item: Item, success: string[] = []): FlagSet {
    const applicable_flags = new FlagSet(Currency.APPLICABLE_FLAGS);

    if (item.corrupted) {
      applicable_flags.enable('CORRUPTED');
    }

    return applicable_flags;
  }

  name() {
    return 'AbstractCurrency';
  }
}
