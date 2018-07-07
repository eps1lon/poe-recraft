import { Item } from 'poe-mods';
import { Reducer } from 'redux';

import * as actions from './actions';

export type State = Item | undefined;

export const initial: State = undefined;

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

function setItemHandle(_: State, action: actions.SetItemAction): State {
  return Item.build(action.payload);
}

function addModHandle(state: State, action: actions.AddModAction): State {
  const { payload: mod } = action;
  const item = state;

  if (item != null) {
    let crafted = item.addMod(mod);
    const added = crafted !== item;

    // try at least one time to make more room for mods
    if (!added) {
      crafted = crafted.rarity.upgrade().addMod(mod);
    }

    return crafted;
  } else {
    return state;
  }
}

function removeModHandle(
  item: State,
  { payload: mod }: actions.RemoveModAction
): State {
  if (item != null) {
    return item.removeMod(mod);
  } else {
    return item;
  }
}

function setRarityHandle(item: State, action: actions.SetRarityAction): State {
  if (item != null) {
    return item.rarity.set(action.payload);
  } else {
    return item;
  }
}

function addTagHandle(item: State, action: actions.AddTagAction): State {
  if (item != null) {
    return item.withMutations(props => ({
      ...props,
      baseitem: {
        ...props.baseitem,
        tags: [...props.baseitem.tags, action.payload]
      }
    }));
  } else {
    return item;
  }
}

function removeTagHandle(item: State, action: actions.RemoveTagAction): State {
  if (item != null) {
    return item.withMutations(props => ({
      ...props,
      baseitem: {
        ...props.baseitem,
        tags: props.baseitem.tags.filter(tag => tag !== action.payload)
      }
    }));
  } else {
    return item;
  }
}

function asElderItemHandle(item: State): State {
  if (item != null) {
    return item.asElderItem();
  } else {
    return item;
  }
}

function asShaperItemHandle(item: State): State {
  if (item != null) {
    return item.asShaperItem();
  } else {
    return item;
  }
}

function removeAtlasModifierHandle(item: State): State {
  if (item != null) {
    return item.removeAtlasModifier();
  } else {
    return item;
  }
}
