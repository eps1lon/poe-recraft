// @flow
import type { Component } from '../Component';
import type Item from '../Item';

export interface Name {
  lines(): string[],
}

export type Builder = string;

export default class ItemName implements Name, Component<Item, Builder> {
  parent: Item;
  random: string;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.random = builder;
  }

  builder(): Builder {
    return this.random;
  }

  lines(): string[] {
    if (this.parent.rarity.isNormal()) {
      return [this.parent.baseitem.name];
    } else if (this.parent.rarity.isMagic()) {
      const prefix = this.parent.affixes.getPrefixes()[0];
      const suffix = this.parent.affixes.getSuffixes()[0];

      return [
        [
          prefix && prefix.props.name,
          this.parent.baseitem.name,
          suffix && suffix.props.name,
        ]
          .filter(Boolean)
          .join(' '),
      ];
    } else if (this.parent.rarity.isRare()) {
      return [this.random, this.parent.baseitem.name];
    } else if (this.parent.rarity.isUnique()) {
      return ['TODO unique name?', this.parent.baseitem.name];
    } else {
      throw new Error(`unrecognized rarity ${String(this.parent.rarity)}`);
    }
  }
}
