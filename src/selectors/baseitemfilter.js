// @flow
import type { State } from 'reducers/rootReducer';
import type { BaseItemTypeProps } from 'selectors/schema';
import { checkCnf } from 'util/predicate';

export type BaseitemFilter = {
  item_class?: number,
  tags?: string[][]
};

export function filterItems(
  filter: BaseitemFilter,
  items: BaseItemTypeProps[]
) {
  return items.filter(applyFilter(filter));
}

export function activeItemClass(state: State): number {
  return state.baseitemfilter.item_class || 23;
}

function applyFilter(filter: BaseitemFilter) {
  return (item: BaseItemTypeProps) =>
    // filter.item_class => filter.item_class == item.item_class
    (filter.item_class == null ||
      filter.item_class === item.item_class.primary) &&
    (filter.tags == null ||
      checkCnf(filter.tags, item.tags.map(({ id }) => id)));
}
