import { Reducer } from 'redux';

import { Action, Types } from './actions';

export interface State {
  item_class: string;
  tags: string[][];
}

const initial: State = {
  item_class: 'Boots',
  // ccnf
  tags: [['str_armour']],
};

const reducer: Reducer<State, Action> = (
  state: State = initial,
  action: Action,
): State => {
  switch (action.type) {
    case Types.SET_FILTER:
      return {
        ...state,
        item_class: action.payload.item_class,
        tags: action.payload.tags,
      };
    case Types.SET_ITEM_CLASS:
      return {
        ...state,
        item_class: action.payload,
        tags: [] as string[][],
      };
    default:
      return state;
  }
};

export default reducer;
