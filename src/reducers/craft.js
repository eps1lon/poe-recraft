// @flow
import type { Generator } from 'poe-mods';
import reduceReducers from 'reduce-reducers';

import type { Action as CraftAction } from '../actions/craft';
import type { State as ItemState } from './item';

import { SET_GENERATOR } from '../actions/craft';
import item, { initial as initial_item_state } from './item';

export type State = {
  mod_generator: ?Generator<*, *>
} & ItemState;

const initial: State = {
  mod_generator: undefined,
  // we need to spread the initial here because only the
  // 1st reducer in reduce-reducer gets undefined
  // every subsequent reducer has the 1st initial state
  ...initial_item_state
};

const reducer = (state: State = initial, action: CraftAction): State => {
  switch (action.type) {
    case SET_GENERATOR:
      return {
        ...state,
        mod_generator: action.payload
      };
    default:
      return state;
  }
};

export default reduceReducers(reducer, item);
