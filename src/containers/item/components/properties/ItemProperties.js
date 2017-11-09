// @flow
import type { Properties as ComputedProperties } from './ComputedProperties';
import buildArmourProperties from './ArmourProperties';
import type { Component } from '../../Component';
import type Item from '../../Item';

export interface Properties {
  list(): ComputedProperties,
}

export type Builder = null;

type PropertyBuilder = Item => ComputedProperties;

function getPropertyBulder(item: Item): ?PropertyBuilder {
  if (item.meta_data.isA('AbstractArmour')) {
    return buildArmourProperties;
  } else {
    return undefined;
  }
}

export default class ItemProperties
  implements Properties, Component<Item, Builder> {
  parent: Item;

  constructor(item: Item) {
    this.parent = item;
  }

  builder(): Builder {
    return null;
  }

  list(): ComputedProperties {
    const build = getPropertyBulder(this.parent);

    if (build == null) {
      return (({}: any): ComputedProperties);
    } else {
      return build(this.parent);
    }
  }

  any(): boolean {
    return getPropertyBulder(this.parent) != null;
  }
}
