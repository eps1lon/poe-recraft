// @flow
import type Item from '../poe/ModContainer/Item';

import type { Action as ItemAction } from '../actions/item';
import { SET_ITEM } from '../actions/item';

export type State = {
  item: ?Item
};

const initial: State = {
  item: undefined
};

const reducer = (state: State = initial, action: ItemAction) => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
