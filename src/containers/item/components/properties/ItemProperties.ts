// @flow
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

export default class ItemProperties
  implements Properties, Component<Item, Builder> {
  parent: Item;

  // eslint-disable-next-line no-unused-vars
  constructor(item: Item, builder: Builder) {
    this.parent = item;
  }

  builder(): Builder {
    return null;
  }

  list(): ComputedProperties {
    const build = getPropertyBulder(this.parent);

    if (build == null) {
      return {};
    } else {
      return build(this.parent);
    }
  }

  any(): boolean {
    return getPropertyBulder(this.parent) != null;
  }
}
