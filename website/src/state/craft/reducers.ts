import { Reducer } from 'redux';

import itemReducer, {
  actions as item_actions,
  initial_state as initial_item_state,
  State as ItemState,
} from '../item';
import * as actions from './actions';

export interface State {
  item: ItemState;
  mod_generator: actions.DefaultGenerator | undefined;
  mod_generator_id: string | undefined;
}

const initial: State = {
  mod_generator: undefined,
  mod_generator_id: '',
  item: initial_item_state,
};

const reducer: Reducer<State, actions.Action> = (
  state: State = initial,
  action: actions.Action | item_actions.Action,
) => {
  switch (action.type) {
    case actions.Type.APPLY_GENERATOR:
      return applyGeneratorHandle(state);
    case actions.Type.SET_GENERATOR:
      return setGeneratorHandle(state, action);
    case actions.Type.USE_GENERATOR:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useGeneratorHandle(state, action);
    default:
      const newItem = itemReducer(state.item, action);
      if (newItem !== state.item) {
        return {
          ...state,
          item: newItem,
        };
      }

      return state;
  }
};

function setGeneratorHandle(
  state: State,
  action: actions.SetGeneratorAction,
): State {
  return {
    ...state,
    mod_generator: action.payload,
  };
}

function applyGeneratorHandle(state: State): State {
  if (state.mod_generator != null && state.item != null) {
    return {
      ...state,
      item: state.mod_generator.applyTo(state.item),
    };
  } else {
    return state;
  }
}

function useGeneratorHandle(
  state: State,
  action: actions.UseGeneratorAction,
): State {
  return {
    ...state,
    mod_generator_id: action.payload,
  };
}

export default reducer;
