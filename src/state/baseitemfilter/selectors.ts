import { createSelector } from 'reselect';

import { State } from './reducers';
import { BaseItemTypeProps } from '../poe/schema';
import { PoeState } from '../poe';
import { checkCnf } from 'util/predicate';

export type BaseitemFilter = {
  item_class: string;
  tags: string[][];
};

export const makeFilterItems = () =>
  createSelector(
    (state: { baseitemfilter: State; poe: PoeState }) => state.poe.items,
    (state: { baseitemfilter: State }) => state.baseitemfilter,
    (items, filter) => items.filter(applyFilter(filter))
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
