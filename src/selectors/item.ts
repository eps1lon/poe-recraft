import { createSelector } from 'reselect';

import { State } from 'reducers/rootReducer';
import { BaseItemTypeProps, TagProps } from 'selectors/schema';
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

export function activeBaseitem(state: State): BaseItemTypeProps | undefined {
  return state.craft.item != null ? state.craft.item.baseitem : undefined;
}

export function getTags(state: State): TagProps[] {
  return state.craft.item != null ? state.craft.item.getTags() : [];
}

export function getChangeableTags(state: State): TagProps[] {
  return state.craft.item != null ? state.craft.item.baseitem.tags : [];
}

const diff = (a: TagProps[], b: TagProps[]) =>
  a.filter(tag => b.find(other => tag === other) === undefined);

// selector to get addable, removeable and current tags
export function editableTagsSelector() {
  return createSelector(
    (state: State) => state.poe.tags,
    getTags,
    getChangeableTags,
    (all, current, removable) => {
      return {
        addable: diff(all, [...removable, ...current]),
        removable,
        current: diff(current, removable)
      };
    }
  );
}
