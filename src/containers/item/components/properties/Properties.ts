import Component from '../../Component';
import Item from '../../Item';

export interface Properties {
  readonly quality: number;
  setQuality(quality: number): Item;
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

  public setQuality(new_quality: number): Item {
    if (new_quality === this.quality) {
      return this.parent;
    }

    return this.parent.withMutations(builder => {
      return {
        ...builder,
        properties: {
          ...builder.properties,
          quality: new_quality,
        },
      };
    });
  }
}
