// @flow
import _ from 'lodash';

import type { Item } from '../../containers';

import { type Flags, anySet } from '../../util/Flags';
import ItemOrb, {
  type ApplicableFlag as BaseApplicableFlag,
  type ApplicableFlags as BaseApplicableFlags,
} from './ItemOrb';

export type ApplicableFlag = BaseApplicableFlag | 'not_magic_rare';
export type ApplicableFlags = BaseApplicableFlags | Flags<ApplicableFlag>;

export default class Annulment extends ItemOrb {
  constructor() {
    super([]);
  }

  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      const locked_prefixes = item.affixes.lockedPrefixes();
      const locked_suffixes = item.affixes.lockedSuffixes();

      const mods = item.affixes.mods.filter(mod => {
        return (
          // locked_prefixes => !isPrefix
          (!locked_prefixes || !mod.isPrefix()) &&
          // locked_suffixes => !isSuffix
          (!locked_suffixes || !mod.isSuffix())
        );
      });

      if (mods.length > 0) {
        const annul = _.sample(mods);

        return item.removeMod(annul);
      } else {
        return item;
      }
    } else {
      return item;
    }
  }

  applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_magic_rare: false,
    };

    if (!item.rarity.isMagic() && !item.rarity.isRare()) {
      applicable_flags.not_magic_rare = true;
    }

    return applicable_flags;
  }

  modsFor(item: Item, whitelist: string[] = []) {
    return [];
  }
}
