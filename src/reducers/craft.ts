import { Generator } from 'poe-mods';
import reduceReducers from 'reduce-reducers';
import { Reducer } from 'redux';

import { State as ItemState } from './item';

import {
  Type,
  Action,
  DefaultGenerator,
  setGenerator,
  SetGeneratorAction,
  applyGenerator,
  ApplyGeneratorAction,
  useGenerator,
  UseGeneratorAction
} from 'actions/craft';
import item, { initial as initial_item_state } from './item';

export interface State extends ItemState {
  mod_generator: DefaultGenerator | undefined;
  mod_generator_id: string | undefined;
}

const initial: State = {
  mod_generator: undefined,
  mod_generator_id: '',
  // we need to spread the initial here because only the
  // 1st reducer in reduce-reducer gets undefined
  // every subsequent reducer has the 1st initial state
  ...initial_item_state
};

const reducer: Reducer<State, Action> = (
  state: State = initial,
  action: Action
) => {
  switch (action.type) {
    case Type.APPLY_GENERATOR:
      return applyGeneratorHandle(state, action);
    case Type.SET_GENERATOR:
      return setGeneratorHandle(state, action);
    case Type.USE_GENERATOR:
      return useGeneratorHandle(state, action);
    default:
      return state;
  }
};

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

function useGeneratorHandle(state: State, action: UseGeneratorAction): State {
  return {
    ...state,
    mod_generator_id: action.payload
  };
}

// @ts-ignore
// ts does not recognize that CraftState extends ItemState
export default reduceReducers(reducer, item);
