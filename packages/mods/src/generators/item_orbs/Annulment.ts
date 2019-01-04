import * as _ from 'lodash';

import Item from '../../containers/item';

import { anySet } from '../../util/Flags';
import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from './ItemOrb';

export interface ApplicableFlags extends BaseApplicableFlags {
  not_magic_rare: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export default class Annulment extends ItemOrb {
  constructor() {
    super([]);
  }

  public applyTo(item: Item): Item {
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
        if (annul == null) {
          throw new Error('sample returned no mods');
        }

        return item.removeMod(annul);
      } else {
        return item;
      }
    } else {
      return item;
    }
  }

  public applicableTo(item: Item): ApplicableFlags {
    const applicable_flags = {
      ...super.applicableTo(item),
      not_magic_rare: false,
    };

    if (!item.rarity.isMagic() && !item.rarity.isRare()) {
      applicable_flags.not_magic_rare = true;
    }

    return applicable_flags;
  }

  public modsFor(item: Item) {
    return [];
  }
}
