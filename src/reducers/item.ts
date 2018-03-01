import { Item } from 'poe-mods';
import { Reducer } from 'redux';

import {
  Type,
  Action,
  AddModAction,
  addMod,
  RemoveModAction,
  removeMod,
  SetItemAction,
  setItem,
  SetRarityAction,
  setRarity,
  AddTagAction,
  addTag,
  RemoveTagAction,
  removeTag,
  AsElderItemAction,
  asElderItem,
  AsShaperItemAction,
  asShaperItem,
  RemoveAtlasModifierAction,
  removeAtlasModifier
} from 'actions/item';

export interface State {
  item: Item | undefined;
}

export const initial: State = {
  item: undefined
};

const reducer: Reducer<State, Action> = (
  state: State = initial,
  action: Action
): State => {
  switch (action.type) {
    case Type.SET_ITEM:
      return setItemHandle(state, action);
    case Type.SET_RARITY:
      return setRarityHandle(state, action);
    case Type.ADD_MOD:
      return addModHandle(state, action);
    case Type.REMOVE_MOD:
      return removeModHandle(state, action);
    case Type.ADD_TAG:
      return addTagHandle(state, action);
    case Type.REMOVE_TAG:
      return removeTagHandle(state, action);
    case Type.AS_ELDER_ITEM:
      return asElderItemHandle(state, action);
    case Type.AS_SHAPER_ITEM:
      return asShaperItemHandle(state, action);
    case Type.REMOVE_ATLAS_MODIFIER:
      return removeAtlasModifierHandle(state, action);
    default:
      return state;
  }
};
export default reducer;

function setItemHandle(state: State, action: SetItemAction): State {
  return {
    ...state,
    item: Item.build(action.payload)
  };
}

function addModHandle(state: State, action: AddModAction): State {
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
  { payload: mod }: RemoveModAction
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

function setRarityHandle(state: State, action: SetRarityAction): State {
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

function addTagHandle(state: State, action: AddTagAction): State {
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

function removeTagHandle(state: State, action: RemoveTagAction): State {
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

function asElderItemHandle(state: State, action: AsElderItemAction): State {
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

function asShaperItemHandle(state: State, action: AsShaperItemAction): State {
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

function removeAtlasModifierHandle(
  state: State,
  action: RemoveAtlasModifierAction
): State {
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
