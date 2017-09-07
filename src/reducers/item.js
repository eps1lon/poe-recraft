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
const reducer = handleActions(
  {
    [setItem.toString()](
      state: State,
      action: ReduxActionType<typeof setItem>
    ): State {
      return {
        ...state,
        item: action.payload
      };
    },
    [addMod.toString()](
      state: State,
      { payload: mod }: ReduxActionType<typeof addMod>
    ): State {
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
    },
    [removeMod.toString()](
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
    },
    [setItemClass.toString()](
      state: State,
      { payload: item_class }: ReduxActionType<typeof setItemClass>
    ): State {
      return {
        ...state,
        item_class
      };
    }
  },
  initial
);

export default reducer;
