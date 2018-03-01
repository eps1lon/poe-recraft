import { State } from 'reducers/rootReducer';
import { BaseItemTypeProps } from 'selectors/schema';
import { checkCnf } from 'util/predicate';

export type BaseitemFilter = {
  item_class: string;
  tags: string[][];
};

export function filterItems(
  filter: Partial<BaseitemFilter>,
  items: BaseItemTypeProps[]
) {
  return items.filter(applyFilter(filter));
}

export function activeItemClass(state: State): string {
  return state.baseitemfilter.item_class || 'Boots';
}

function applyFilter(filter: Partial<BaseitemFilter> = {}) {
  return (item: BaseItemTypeProps) =>
    // filter.item_class => filter.item_class == item.item_class
    (filter.item_class == null || filter.item_class === item.item_class) &&
    (filter.tags == null || checkCnf(filter.tags, item.tags));
}
