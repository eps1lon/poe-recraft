// @flow
import type { State } from '../reducers/rootReducer';
import type { ItemClassProps } from '../poe/data/schema';

import Item from '../poe/ModContainer/Item';

export function itemsForClass(item_class: ItemClassProps) {
  return (state: State) => {
    return state.poe.items.filter(item => {
      return item.item_class.primary === item_class.primary;
    });
  };
}

export function defaultItem(state: State): Item {
  // TODO selected itemclass
  const item_class = { primary: 23, name: 'Boots' }; // boots
  const meta_data = state.poe.metadata;

  const items_of_class = itemsForClass(item_class)(state);

  return Item.build(items_of_class[0], meta_data);
}
