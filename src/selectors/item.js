// @flow
import type { State } from 'reducers/rootReducer';
import type { BaseItemTypeProps } from 'selectors/schema';
import { filterItems } from 'selectors/baseitemfilter';

export function defaultItem(state: State): BaseItemTypeProps {
  const { item_class, tags } = state.baseitemfilter;
  const items = state.poe.items;

  const items_of_class = filterItems({ item_class, tags }, items);

  if (items_of_class.length === 0) {
    throw new Error(`no items found for ${item_class} with ${String(tags)}`);
  }

  return items_of_class[0];
}

export function activeBaseitem(state: State): ?BaseItemTypeProps {
  return state.craft.item != null ? state.craft.item.baseitem : undefined;
}
