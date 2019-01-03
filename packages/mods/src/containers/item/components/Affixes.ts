import { Mod, metaMods as META_MODS } from '../../../mods';

import Item from '../Item';
import ImmutableContainer from '../../ImmutableContainer';

export interface Builder {
  item: Item;
  mods: Mod[];
}

/**
 * the explicits of an item
 */
export default class ItemAffixes extends ImmutableContainer<Mod, Builder> {
  public static withBuilder(builder: Builder): ItemAffixes {
    return new ItemAffixes(builder.item, builder.mods);
  }

  public item: Item;

  constructor(item: Item, mods: Mod[]) {
    super(mods);

    this.item = item;
  }

  public builder() {
    return {
      item: this.item,
      mods: this.mods,
    };
  }

  /**
   * @override
   */
  public maxModsOfType(mod: Mod): number {
    if (mod.isPrefix()) {
      return this.maxPrefixes();
    } else if (mod.isSuffix()) {
      return this.maxSuffixes();
    } else {
      return 0;
    }
  }

  /**
   *  checks if the domains are equiv
   */
  public inDomainOf(mod_domain: number): boolean {
    switch (mod_domain) {
      case Mod.DOMAIN.MASTER:
        return this.inDomainOf(Mod.DOMAIN.ITEM);
      default:
        return mod_domain === this.modDomainEquiv();
    }
  }

  public level(): number {
    return this.item.props.item_level;
  }

  public lockedPrefixes(): boolean {
    return this.indexOfModWithId(META_MODS.LOCKED_PREFIXES) !== -1;
  }

  public lockedSuffixes(): boolean {
    return this.indexOfModWithId(META_MODS.LOCKED_SUFFIXES) !== -1;
  }

  public getPrefixes(): Mod[] {
    return this.mods.filter(mod => mod.isPrefix());
  }

  public getSuffixes(): Mod[] {
    return this.mods.filter(mod => mod.isSuffix());
  }

  /**
   * maximum number of prefixes
   */
  public maxPrefixes(): number {
    if (this.item.rarity.isNormal()) {
      return 0;
    } else if (this.item.rarity.isMagic()) {
      return 1;
    } else if (this.item.rarity.isRare()) {
      if (this.item.meta_data.isA('AbstractJewel')) {
        return 2;
      } else if (this.item.meta_data.isA('AbstractAbyssJewel')) {
        return 2;
      }
      return 3;
    } else if (this.item.rarity.isUnique()) {
      return Number.POSITIVE_INFINITY;
    } else {
      throw new Error('rarity not recognized');
    }
  }

  public maxSuffixes(): number {
    return this.maxPrefixes();
  }

  private modDomainEquiv(): number {
    if (this.item.meta_data.isA('AbstractJewel')) {
      return Mod.DOMAIN.JEWEL;
    }
    if (this.item.meta_data.isA('AbstractFlask')) {
      return Mod.DOMAIN.FLASK;
    }
    if (this.item.meta_data.isA('AbstractMap')) {
      return Mod.DOMAIN.MAP;
    }
    if (this.item.meta_data.isA('AbstractAbyssJewel')) {
      return Mod.DOMAIN.ABYSS_JEWEL;
    }
    return Mod.DOMAIN.ITEM;
  }
}
