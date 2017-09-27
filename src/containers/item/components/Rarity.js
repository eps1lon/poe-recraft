// @flow
import type { Component } from '../Component';
import Item from '../Item';

export type RarityIdent = 'normal' | 'magic' | 'rare' | 'unique' | 'showcase';
export const RarityTypes: { [RarityIdent]: number } = {
  normal: 1,
  magic: 2,
  rare: 3,
  unique: 4,
  showcase: 5,
};
export type RarityType = $Values<typeof RarityTypes>;

export interface Rarity<T> {
  isNormal(): boolean,
  isMagic(): boolean,
  isRare(): boolean,
  isUnique(): boolean,
  set(RarityIdent): T,
  upgrade(): T,
  toString(): RarityIdent,
}

export type Builder = RarityType;

/**
 * mixin for Item
 * 
 */
export default class ItemRarity
  implements Rarity<Item>, Component<Item, Builder> {
  parent: Item;
  type: RarityType;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.type = builder;
  }

  builder(): Builder {
    return this.type;
  }

  isNormal(): boolean {
    return this.type === RarityTypes.normal;
  }

  isMagic(): boolean {
    return this.type === RarityTypes.magic;
  }

  isRare(): boolean {
    return this.type === RarityTypes.rare || this.type === RarityTypes.showcase;
  }

  isUnique(): boolean {
    return this.type === RarityTypes.unique;
  }

  upgrade() {
    let new_rarity = this.type;

    if (this.isNormal()) {
      new_rarity = RarityTypes.magic;
    } else if (this.isMagic()) {
      new_rarity = RarityTypes.rare;
    }

    return this.parent.withMutations(builder => {
      return {
        ...builder,
        rarity: new_rarity,
      };
    });
  }

  set(rarity: RarityIdent) {
    return this.parent.withMutations(builder => {
      return {
        ...builder,
        rarity: RarityTypes[rarity],
      };
    });
  }

  toString(): RarityIdent {
    // get key for which value === this.type
    const entry = Object.entries(RarityTypes).find(
      ([, value]) => value === this.type,
    );

    if (entry == null) {
      throw new Error(
        `corrupted state: type was set to a non existing rarity (${this.type})`,
      );
    }

    return entry[0];
  }
}
