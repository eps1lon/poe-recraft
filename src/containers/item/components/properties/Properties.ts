import Component from '../../Component';
import Item from '../../Item';

export interface NumericProperty {
  value: number | [number, number];
  augmented: boolean;
}

export interface Properties {
  quality: number;
}

export interface Builder {
  quality: number;
}

/**
 * properties for every item
 * 
 * this is used for miscellaneous properties that don't really fit
 * into any other component
 */
export default class ItemProperties
  implements Properties, Component<Item, Builder> {
  public parent: Item;
  public quality: number;

  // eslint-disable-next-line no-unused-vars
  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.quality = builder.quality;
  }

  public builder(): Builder {
    return {
      quality: this.quality,
    };
  }

  public any(): boolean {
    return this.quality > 0;
  }
}
