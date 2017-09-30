// @flow
import type { Generator } from 'poe-mods';
import reduceReducers from 'reduce-reducers';
import { handleActions } from 'redux-actions';

import type { State as ItemState } from './item';

import {
  setGenerator,
  type SetGeneratorAction,
  applyGenerator,
  type ApplyGeneratorAction
} from 'actions/craft';
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
    [setGenerator.toString()]: setGeneratorHandle,
    [applyGenerator.toString()]: applyGeneratorHandle
  },
  initial
);

function setGeneratorHandle(state: State, action: SetGeneratorAction): State {
  return {
    ...state,
    mod_generator: action.payload
  };
}

function applyGeneratorHandle(
  state: State,
  action: ApplyGeneratorAction
): State {
  if (state.mod_generator != null && state.item != null) {
    return {
      ...state,
      item: state.mod_generator.applyTo(state.item)
    };
  } else {
    return state;
  }
}

export default reduceReducers(reducer, item);
