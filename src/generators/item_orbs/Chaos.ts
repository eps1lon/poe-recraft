import { random } from 'lodash';

import Item from '../../containers/item';
import { ModProps } from '../../schema';

import { Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  ApplicableFlag as BaseApplicableFlag,
  ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';
import Alchemy from './Alchemy';
import Exalted from './Exalted';
import Scouring from './Scouring';
import Transmute from './Transmute';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_rare: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Chaos extends ItemOrb {
  static build(mods: ModProps[]): Chaos {
    return new Chaos(Transmute.buildMods(mods));
  }

  /**
   *  rerolls properties of magic
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      const locked_prefixes = item.affixes.lockedPrefixes();
      const locked_suffixes = item.affixes.lockedSuffixes();

      if (locked_prefixes && locked_suffixes) {
        // TODO rerolls name so it is actually a new item
        return item;
      }

      const scoured_item = new Scouring().applyTo(item);

      let reforged_item = new Alchemy(this.mods).applyTo(scoured_item);

      // no complete scour?
      if (reforged_item === scoured_item) {
        // limit the possible mods of this exalt according to
        // meta mods since usually adding prefixes is ok even with locked_prefixes
        const exalted = new Exalted(
          this.mods.filter(mod => {
            return (
              // locked_suffixes => !suffix
              (!locked_suffixes || !mod.isSuffix()) &&
              // locked_prefixes => !prefix
              (!locked_prefixes || !mod.isPrefix())
            );
          }),
        );

        const new_mods = random(2, 3);

        for (let i = 1; i <= new_mods; i += 1) {
          reforged_item = exalted.applyTo(reforged_item);
        }
      }

      return reforged_item;
    } else {
      return item;
    }
  }

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_rare: false,
    };

    if (!item.rarity.isRare()) {
      applicable_flags.not_rare = true;
    }

    return applicable_flags;
  }
}
