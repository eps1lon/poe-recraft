// @flow
import { handleActions } from 'redux-actions';

import {
  setItemClass,
  type SetItemClassAction,
  setFilter,
  type SetFilterAction
} from 'actions/baseitemfilter';

export type State = {
  item_class: number,
  tags: string[][]
};

const initial: State = {
  item_class: 23, // boots
  // ccnf
  tags: [['str_armour']]
};

const reducer = handleActions(
  {
    [setItemClass.toString()]: setItemClassHandle,
    [setFilter.toString()]: setFilterHandle
  },
  initial
);

export default reducer;

function setItemClassHandle(state: State, action: SetItemClassAction) {
  return {
    ...state,
    item_class: action.payload,
    tags: []
  };
}

function setFilterHandle(state: State, action: SetFilterAction) {
  return {
    ...state,
    item_class: action.payload.item_class,
    tags: action.payload.tags
  };
}
