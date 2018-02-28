import Component from '../Component';
import Item from '../Item';

export interface Sockets {
  max(): number;
}

export type Builder = number;

/** 
 * WIP item component for sockets
 */
export default class ItemSockets implements Sockets, Component<Item, Builder> {
  public amount: number;
  public parent: Item;

  constructor(item: Item, builder: Builder) {
    this.parent = item;
    this.amount = builder;
  }

  public builder() {
    return this.amount;
  }

  // TODO: what about Corroded Blades or other similar 1x4 Items. Confirm
  // that they also only can have max 4 sockets like Rods or act like small_Staff
  public max(): number {
    const by_stats = this.maxOverride();

    // tags take priority
    if (by_stats != null) {
      return by_stats;
    } else {
      return Math.min(
        this.maxByDimensions(),
        this.maxByLevel(),
        this.maxByMetaData(),
      );
    }
  }

  public any(): boolean {
    return this.amount > 0;
  }

  private maxByMetaData(): number {
    const { meta_data } = this.parent;

    if (meta_data.isA('AbstractShield')) {
      return 3;
    } else if (meta_data.isA('AbstractArmour')) {
      return 6;
    } else if (meta_data.isA('AbstractOneHandWeapon')) {
      return 3;
    } else if (meta_data.isA('AbstractFishingRod')) {
      return 4;
    } else if (meta_data.isA('AbstractTwoHandWeapon')) {
      return 6;
    } else if (meta_data.isA('Equipment')) {
      return 0;
    } else {
      throw new Error(
        `Can't determine sockes from meta data for ${meta_data.clazz}`,
      );
    }
  }

  private maxByLevel(): number {
    const { props } = this.parent;

    if (props.item_level <= 1) {
      return 2;
    } else if (props.item_level <= 2) {
      return 3;
    } else if (props.item_level <= 25) {
      return 4;
    } else if (props.item_level <= 35) {
      return 5;
    } else {
      return 6;
    }
  }

  private maxByDimensions(): number {
    const { width, height } = this.parent.baseitem;

    return width * height;
  }

  private maxOverride(): number | undefined {
    const stats = this.parent.stats();
    const tags = this.parent.getTags();

    if (stats.local_has_X_sockets != null) {
      return stats.local_has_X_sockets.values.max;
    } else if (tags.find(id => id === 'small_staff') !== undefined) {
      return 3;
    }

    return undefined;
  }
}
