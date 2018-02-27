import Component from '../Component';
import Item from '../Item';

export interface Name {
  lines(): string[];
}

export type Builder = string;

/** 
 * the name of an item
 * 
 * for magic items those name consists of the baseitemname and the prefix/suffix
 * rare and unique items have a set name
 */
export default class ItemName implements Name, Component<Item, Builder> {
  public parent: Item;
  public random: string;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.random = builder;
  }

  public builder(): Builder {
    return this.random;
  }

  public lines(): string[] {
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

  public any(): boolean {
    return true;
  }
}
