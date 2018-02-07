import Component from '../Component';
import Item from '../Item';

export enum RarityKind {
  normal = 1,
  magic = 2,
  rare = 3,
  unique = 4,
  showcase = 5,
}
export type RarityIdent = keyof typeof RarityKind;

export interface Rarity<T> {
  isNormal(): boolean;
  isMagic(): boolean;
  isRare(): boolean;
  isUnique(): boolean;
  set(rarity: RarityIdent): T;
  upgrade(): T;
  toString(): RarityIdent;
}

export type Builder = RarityKind;

/**
 * mixin for Item
 * 
 */
export default class ItemRarity
  implements Rarity<Item>, Component<Item, Builder> {
  public parent: Item;
  public kind: RarityKind;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.kind = builder;
  }

  public builder(): Builder {
    return this.kind;
  }

  public isNormal(): boolean {
    return this.kind === RarityKind.normal;
  }

  public isMagic(): boolean {
    return this.kind === RarityKind.magic;
  }

  public isRare(): boolean {
    return this.kind === RarityKind.rare || this.kind === RarityKind.showcase;
  }

  public isUnique(): boolean {
    return this.kind === RarityKind.unique;
  }

  public upgrade() {
    let new_rarity = this.kind;

    if (this.isNormal()) {
      new_rarity = RarityKind.magic;
    } else if (this.isMagic()) {
      new_rarity = RarityKind.rare;
    }

    return this.parent.withMutations(builder => {
      return {
        ...builder,
        rarity: new_rarity,
      };
    });
  }

  public set(rarity: RarityIdent) {
    return this.parent.withMutations(builder => {
      return {
        ...builder,
        rarity: RarityKind[rarity],
      };
    });
  }

  public toString(): RarityIdent {
    return RarityKind[this.kind].toString() as RarityIdent;
  }

  public any(): boolean {
    // ItemRarity always has a rarity
    return true;
  }
}
