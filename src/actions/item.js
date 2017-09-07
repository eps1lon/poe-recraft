// @flow
import type Item from '../poe/ModContainer/Item';
import type { ItemClassProps } from '../poe/data/schema';

export const SET_ITEM = 'ITEM/SET_ITEM';
export type SetItemAction = {
  type: 'ITEM/SET_ITEM',
  payload: Item
};

export const SET_ITEM_CLASS = 'ITEM/SET_ITEM_CLASS';
export type SetItemClassAction = {
  type: 'ITEM/SET_ITEM_CLASS',
  payload: ItemClassProps
};

export function setItem(item: Item): SetItemAction {
  return {
    type: SET_ITEM,
    payload: item
  };
}

export function setItemClass(item_class: ItemClassProps): SetItemClassAction {
  return {
    type: SET_ITEM_CLASS,
    payload: item_class
  };
}

export type Action = SetItemAction | SetItemClassAction;
