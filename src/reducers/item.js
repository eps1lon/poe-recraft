// @flow
import { Item } from 'poe-mods';
import type { ReduxActionType } from 'redux-actions';
import { handleActions } from 'redux-actions';

import {
  addMod,
  removeMod,
  setItem,
  setRarity,
  addTag,
  removeTag
} from 'actions/item';

export type State = {
  item: ?Item
};

export const initial: State = {
  item: undefined
};

// return types are not type checked by flow!
export default handleActions(
  {
    [setItem.toString()]: setItemHandle,
    [addMod.toString()]: addModHandle,
    [removeMod.toString()]: removeModHandle,
    [setRarity.toString()]: setRarityHandle,
    [addTag.toString()]: addTagHandle,
    [removeTag.toString()]: removeTagHandle
  },
  initial
);

function setItemHandle(
  state: State,
  action: ReduxActionType<typeof setItem>
): State {
  return {
    ...state,
    item: Item.build(action.payload)
  };
}

function addModHandle(
  state: State,
  action: ReduxActionType<typeof addMod>
): State {
  const { payload: mod } = action;
  const { item } = state;

  if (item != null) {
    console.log(item, '+', mod);

    let crafted = item.addMod(mod);
    const added = crafted !== item;

    // try at least one time to make more room for mods
    if (!added) {
      crafted = crafted.rarity.upgrade().addMod(mod);
    }

    console.log('changed?', crafted !== item);

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
  { payload: mod }: ReduxActionType<typeof removeMod>
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

function setRarityHandle(
  state: State,
  action: ReduxActionType<typeof setRarity>
): State {
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

function addTagHandle(
  state: State,
  action: ReduxActionType<typeof addTag>
): State {
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

function removeTagHandle(
  state: State,
  action: ReduxActionType<typeof removeTag>
): State {
  const { item } = state;

  if (item != null) {
    return {
      ...state,
      item: item.withMutations(props => ({
        ...props,
        baseitem: {
          ...props.baseitem,
          tags: props.baseitem.tags.filter(tag => tag.id !== action.payload.id)
        }
      }))
    };
  } else {
    return state;
  }
}
