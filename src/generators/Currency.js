// @flow
import type { Item } from '../containers/';
import type { ModProps } from '../data/schema';

import { type Flags, anySet } from '../Flags';
import { RollableMod } from '../mods/';
import Generator from './Generator';

const filterNone = () => true;

export type ApplicableFlag = 'not_an_item' | 'corrupted' | 'mirrored';

export type ApplicableFlags = Flags<ApplicableFlag>;

/**
 * abstract representation of ingame currency which only accepts
 * prefixes, suffixes and implicits
 */
export default class Currency extends Generator<RollableMod> {
  static APPLICABLE_FLAGS: ApplicableFlags = {
    not_an_item: false,
    corrupted: false,
    mirrored: false,
  };

  // build<T: Currency>(currency: Class<T>): T not working
  static build(
    mods: ModProps[],
    filter: ModProps => boolean = filterNone,
    CurrencyClass: Class<$Subtype<Currency>>, // eslint-disable-line no-undef
    // eslint-disable-next-line no-undef
  ): $Subtype<Currency> {
    const rollable_mods = mods
      .filter(props => props.spawn_weights.length > 0 && filter(props))
      .map(props => new RollableMod(props));

    return new CurrencyClass(rollable_mods);
  }

  modsFor(item: Item, whitelist: string[] = []) {
    return this.getAvailableMods()
      .map(mod => {
        const applicable_flags = mod.applicableTo(item);
        const spawnable_flags = mod.spawnableOn(item);
        const spawnweight = mod.spawnweightFor(item);

        const is_applicable = !anySet(applicable_flags, whitelist);

        const is_spawnable = !anySet(spawnable_flags, whitelist);

        const is_rollable = is_applicable && is_spawnable;

        if (is_rollable) {
          return {
            mod,
            applicable: applicable_flags,
            spawnable: spawnable_flags,
            spawnweight,
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
  applicableTo(item: Item, success: string[] = []): ApplicableFlags {
    const applicable_flags = { ...Currency.APPLICABLE_FLAGS };

    if (item.props.corrupted) {
      applicable_flags.corrupted = true;
    }

    if (item.props.mirrored) {
      applicable_flags.mirrored = true;
    }

    return applicable_flags;
  }
}
