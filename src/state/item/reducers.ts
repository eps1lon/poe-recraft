import { Item } from 'poe-mods';
import { Reducer } from 'redux';

import * as actions from './actions';

export interface State {
  item: Item | undefined;
}

export const initial: State = {
  item: undefined
};

const reducer: Reducer<State, actions.Action> = (
  state: State = initial,
  action: actions.Action
): State => {
  switch (action.type) {
    case actions.Type.SET_ITEM:
      return setItemHandle(state, action);
    case actions.Type.SET_RARITY:
      return setRarityHandle(state, action);
    case actions.Type.ADD_MOD:
      return addModHandle(state, action);
    case actions.Type.REMOVE_MOD:
      return removeModHandle(state, action);
    case actions.Type.ADD_TAG:
      return addTagHandle(state, action);
    case actions.Type.REMOVE_TAG:
      return removeTagHandle(state, action);
    case actions.Type.AS_ELDER_ITEM:
      return asElderItemHandle(state);
    case actions.Type.AS_SHAPER_ITEM:
      return asShaperItemHandle(state);
    case actions.Type.REMOVE_ATLAS_MODIFIER:
      return removeAtlasModifierHandle(state);
    default:
      return state;
  }
};
export default reducer;

function setItemHandle(state: State, action: actions.SetItemAction): State {
  return {
    ...state,
    item: Item.build(action.payload)
  };
}

function addModHandle(state: State, action: actions.AddModAction): State {
  const { payload: mod } = action;
  const { item } = state;

  if (item != null) {
    let crafted = item.addMod(mod);
    const added = crafted !== item;

    // try at least one time to make more room for mods
    if (!added) {
      crafted = crafted.rarity.upgrade().addMod(mod);
    }

    return {
      ...state,
      item: crafted
    };
  } else {
    return state;
  }
}

function removeModHandle(
  state: State,
  { payload: mod }: actions.RemoveModAction
): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.removeMod(mod)
    };
  } else {
    return state;
  }
}

function setRarityHandle(state: State, action: actions.SetRarityAction): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.rarity.set(action.payload)
    };
  } else {
    return state;
  }
}

function addTagHandle(state: State, action: actions.AddTagAction): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.withMutations(props => ({
        ...props,
        baseitem: {
          ...props.baseitem,
          tags: [...props.baseitem.tags, action.payload]
        }
      }))
    };
  } else {
    return state;
  }
}

function removeTagHandle(state: State, action: actions.RemoveTagAction): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.withMutations(props => ({
        ...props,
        baseitem: {
          ...props.baseitem,
          tags: props.baseitem.tags.filter(tag => tag !== action.payload)
        }
      }))
    };
  } else {
    return state;
  }
}

function asElderItemHandle(state: State): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.asElderItem()
    };
  } else {
    return state;
  }
}

function asShaperItemHandle(state: State): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.asShaperItem()
    };
  } else {
    return state;
  }
}

function removeAtlasModifierHandle(state: State): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.removeAtlasModifier()
    };
  } else {
    return state;
  }
}
