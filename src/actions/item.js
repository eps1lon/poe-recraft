// @flow
import type Item from '../poe/ModContainer/Item';

export const SET_ITEM = 'ITEM/SET_ITEM';

export type SetItemAction = {
  type: 'ITEM/SET_ITEM',
  payload: Item
};
export function setItem(item: Item): SetItemAction {
  return {
    type: SET_ITEM,
    payload: item
  };
}

export type Action = SetItemAction;
