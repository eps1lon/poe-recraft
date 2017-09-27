// @flow
import { Mod, metaMods as META_MODS } from '../../../mods';

import type Item from '../Item';
import { ImmutableContainer } from '../../../containers';

type Builder = {
  item: Item,
  mods: Mod[],
};

export default class ItemAffixes extends ImmutableContainer<Mod, Builder> {
  static withBuilder(builder: Builder): ItemAffixes {
    return new ItemAffixes(builder.item, builder.mods);
  }

  item: Item;

  constructor(item: Item, mods: Mod[]) {
    super(mods);

    this.item = item;
  }

  builder() {
    return {
      item: this.item,
      mods: this.mods,
    };
  }

  /**
   * @override
   */
  maxModsOfType(mod: Mod): number {
    if (mod.isPrefix()) {
      return this._maxPrefixes();
    } else if (mod.isSuffix()) {
      return this._maxSuffixes();
    } else {
      return 0;
    }
  }

  /**
   *  checks if the domains are equiv
   */
  inDomainOf(mod_domain: number): boolean {
    switch (mod_domain) {
      case Mod.DOMAIN.MASTER:
        return this.inDomainOf(Mod.DOMAIN.ITEM);
      default:
        return mod_domain === this._modDomainEquiv();
    }
  }

  level(): number {
    return this.item.props.item_level;
  }

  lockedPrefixes(): boolean {
    return this.indexOfModWithPrimary(META_MODS.LOCKED_PREFIXES) !== -1;
  }

  lockedSuffixes(): boolean {
    return this.indexOfModWithPrimary(META_MODS.LOCKED_SUFFIXES) !== -1;
  }

  getPrefixes(): Mod[] {
    return this.mods.filter(mod => mod.isPrefix());
  }

  getSuffixes(): Mod[] {
    return this.mods.filter(mod => mod.isSuffix());
  }

  /**
   * maximum number of prefixes
   */
  _maxPrefixes(): number {
    if (this.item.rarity.isNormal()) {
      return 0;
    } else if (this.item.rarity.isMagic()) {
      return 1;
    } else if (this.item.rarity.isRare()) {
      if (this.item.meta_data.isA('AbstractJewel')) {
        return 2;
      }
      return 3;
    } else if (this.item.rarity.isUnique()) {
      return Number.POSITIVE_INFINITY;
    } else {
      throw new Error('rarity not recognized');
    }
  }

  _maxSuffixes(): number {
    return this._maxPrefixes();
  }

  _modDomainEquiv(): number {
    if (this.item.meta_data.isA('AbstractJewel')) {
      return Mod.DOMAIN.JEWEL;
    }
    if (this.item.meta_data.isA('AbstractFlask')) {
      return Mod.DOMAIN.FLASK;
    }
    if (this.item.meta_data.isA('AbstractMap')) {
      return Mod.DOMAIN.MAP;
    }
    return Mod.DOMAIN.ITEM;
  }
}
