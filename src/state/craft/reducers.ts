import { Generator } from 'poe-mods';
import reduceReducers from 'reduce-reducers';
import { Reducer } from 'redux';

import item, { initial_item_state, ItemState } from '../item';
import * as actions from './actions';

export interface State extends ItemState {
  mod_generator: actions.DefaultGenerator | undefined;
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

const reducer: Reducer<State, actions.Action> = (
  state: State = initial,
  action: actions.Action
) => {
  switch (action.type) {
    case actions.Type.APPLY_GENERATOR:
      return applyGeneratorHandle(state);
    case actions.Type.SET_GENERATOR:
      return setGeneratorHandle(state, action);
    case actions.Type.USE_GENERATOR:
      return useGeneratorHandle(state, action);
    default:
      return state;
  }
};

function setGeneratorHandle(
  state: State,
  action: actions.SetGeneratorAction
): State {
  return {
    ...state,
    mod_generator: action.payload
  };
}

function applyGeneratorHandle(state: State): State {
  if (state.mod_generator != null && state.item != null) {
    return {
      ...state,
      item: state.mod_generator.applyTo(state.item)
    };
  } else {
    return state;
  }
}

function useGeneratorHandle(
  state: State,
  action: actions.UseGeneratorAction
): State {
  return {
    ...state,
    mod_generator_id: action.payload
  };
}

// @ts-ignore
// ts does not recognize that CraftState extends ItemState
export default reduceReducers(reducer, item);
