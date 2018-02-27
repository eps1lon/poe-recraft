import { Properties as ComputedProperties } from './ComputedProperties';
import buildArmourProperties from './ArmourProperties';
import Component from '../../Component';
import Item from '../../Item';

export interface Properties {
  list(): ComputedProperties;
}

export type Builder = null;

type PropertyBuilder = (item: Item) => ComputedProperties;

function getPropertyBulder(item: Item): PropertyBuilder | undefined {
  if (item.meta_data.isA('AbstractArmour')) {
    return buildArmourProperties;
  } else {
    return undefined;
  }
}

/**
 * properties for every item 
 */
export default class ItemProperties
  implements Properties, Component<Item, Builder> {
  public parent: Item;

  // eslint-disable-next-line no-unused-vars
  constructor(item: Item, builder: Builder) {
    this.parent = item;
  }

  public builder(): Builder {
    return null;
  }

  public list(): ComputedProperties {
    const build = getPropertyBulder(this.parent);

    if (build == null) {
      return {};
    } else {
      return build(this.parent);
    }
  }

  public any(): boolean {
    return getPropertyBulder(this.parent) != null;
  }
}
