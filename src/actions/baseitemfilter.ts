import { Action, ActionCreator } from 'redux';
import { BaseitemFilter } from 'selectors/baseitemfilter';

export enum Types {
  SET_FILTER = 'BASEITEMFILTER/SET_FILTER',
  SET_ITEM_CLASS = 'BASEITEMFILTER/SET_ITEM_CLASS'
}

export type Action = SetItemClass | SetFilter;

export interface SetItemClass {
  type: Types.SET_ITEM_CLASS;
  payload: number;
}
export const setItemClass = ({ primary }: { primary: number }) => ({
  type: Types.SET_ITEM_CLASS,
  payload: primary
});

export interface SetFilter {
  type: Types.SET_FILTER;
  payload: BaseitemFilter;
}
export const setFilter = (filter: BaseitemFilter) => ({
  type: Types.SET_FILTER,
  payload: filter
});
