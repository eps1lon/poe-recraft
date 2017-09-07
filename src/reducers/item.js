// @flow
import type { ReduxActionType } from 'redux-actions';
import { handleActions } from 'redux-actions';

import type Item from '../poe/ModContainer/Item';
import type { ItemClassProps } from '../poe/data/schema';

import { addMod, removeMod, setItem, setItemClass } from '../actions/item';

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
    [setItemClass.toString()]: setItemClassHandle
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
      crafted = crafted.upgradeRarity().addMod(mod);
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
