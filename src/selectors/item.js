// @flow
import type { State } from 'reducers/rootReducer';
import type { BaseItemTypeProps, ItemClassProps } from 'selectors/schema';

export function itemsForClass(
  item_class: ItemClassProps,
  items: BaseItemTypeProps[]
) {
  return items.filter(item => {
    return item.item_class.primary === item_class.primary;
  });
}

export function defaultItem(state: State): BaseItemTypeProps {
  const item_class = state.craft.item_class;
  const items = state.poe.items;

  const items_of_class = itemsForClass(item_class, items);

  return items_of_class[0];
}

export function activeBaseitem(state: State): ?BaseItemTypeProps {
  return state.craft.item != null ? state.craft.item.baseitem : undefined;
}

export function activeItemclass(state: State): ItemClassProps {
  return state.craft.item_class;
}
