// @flow
import type { ItemClassProps } from 'poe-mods/lib/schema';
import { Item } from 'poe-mods/lib/containers';

import type { State } from 'reducers/rootReducer';

export function itemsForClass(item_class: ItemClassProps) {
  return (state: State) => {
    return state.poe.items.filter(item => {
      return item.item_class.primary === item_class.primary;
    });
  };
}

export function defaultItem(state: State): Item {
  const item_class = state.craft.item_class;

  const items_of_class = itemsForClass(item_class)(state);

  return Item.build(items_of_class[0]);
}

export function activeItemclass(state: State): number {
  return state.craft.item_class.primary;
}
