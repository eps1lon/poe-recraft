import { createSelector } from 'reselect';

import { checkCnf } from 'util/predicate';
import { PoeState } from '../poe';
import { BaseItemTypeProps } from '../poe/schema';
import { State } from './reducers';

export interface BaseitemFilter {
  item_class: string;
  tags: string[][];
}

export const makeFilterItems = () =>
  createSelector(
    (state: { baseitemfilter: State; poe: PoeState }) => state.poe.items.data,
    (state: { baseitemfilter: State }) => state.baseitemfilter,
    (items, filter) => items.filter(applyFilter(filter)),
  );

export function activeItemClass(state: { baseitemfilter: State }): string {
  return state.baseitemfilter.item_class || 'Boots';
}

function applyFilter(filter: Partial<BaseitemFilter> = {}) {
  return (item: BaseItemTypeProps) =>
    // filter.item_class => filter.item_class == item.item_class
    (filter.item_class == null || filter.item_class === item.item_class) &&
    (filter.tags == null || checkCnf(filter.tags, item.tags));
}
