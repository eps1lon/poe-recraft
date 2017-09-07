// @flow
import type Item from '../poe/ModContainer/Item';
import type { ItemClassProps } from '../poe/data/schema';

import type { Action as ItemAction } from '../actions/item';
import { SET_ITEM, SET_ITEM_CLASS } from '../actions/item';

export type State = {
  item_class: ItemClassProps,
  item: ?Item
};

export const initial: State = {
  item_class: { primary: 23, name: 'Boots' },
  item: undefined
};

const reducer = (state: State = initial, action: ItemAction) => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        item: action.payload
      };
    case SET_ITEM_CLASS:
      return {
        ...state,
        item_class: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
