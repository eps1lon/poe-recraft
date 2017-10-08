// @flow
import { createAction, type ReduxActionType } from 'redux-actions';
import { type BaseitemFilter } from 'selectors/baseitemfilter';

export const setItemClass = createAction(
  'SET_ITEM_CLASS',
  ({ primary }: { primary: number }) => primary
);
export type SetItemClassAction = ReduxActionType<typeof setItemClass>;

export const setFilter = createAction(
  'SET_FILTER',
  (filter: BaseitemFilter) => filter
);
export type SetFilterAction = ReduxActionType<typeof setFilter>;
