// @flow
import type { ItemClassProps } from 'poe-mods/lib/schema';
import type { Item } from 'poe-mods/lib/containers';
import type { ReduxActionType } from 'redux-actions';
import { handleActions } from 'redux-actions';

import {
  addMod,
  removeMod,
  setItem,
  setItemClass,
  setRarity
} from '../actions/item';

export type State = {
  item_class: ItemClassProps,
  item: ?Item
};

export const initial: State = {
  item_class: { primary: 23, name: 'Boots' },
  item: undefined
};

// return types are not type checked by flow!
export default handleActions(
  {
    [setItem.toString()]: setItemHandle,
    [addMod.toString()]: addModHandle,
    [removeMod.toString()]: removeModHandle,
    [setItemClass.toString()]: setItemClassHandle,
    [setRarity.toString()]: setRarityHandle
  },
  initial
);

function setItemHandle(
  state: State,
  action: ReduxActionType<typeof setItem>
): State {
  return {
    ...state,
    item: action.payload
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

function setItemClassHandle(
  state: State,
  { payload: item_class }: ReduxActionType<typeof setItemClass>
): State {
  return {
    ...state,
    item_class
  };
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
