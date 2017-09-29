// @flow
import type { Generator } from 'poe-mods';
import reduceReducers from 'reduce-reducers';
import { handleActions } from 'redux-actions';

import type { State as ItemState } from './item';

import { setGenerator, type SetGeneratorAction } from '../actions/craft';
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

const reducer = handleActions(
  {
    [setGenerator.toString()]: setGeneratorHandle
  },
  initial
);

function setGeneratorHandle(state: State, action: SetGeneratorAction): State {
  return {
    ...state,
    mod_generator: action.payload
  };
}

export default reduceReducers(reducer, item);
