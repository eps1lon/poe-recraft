// @flow
import { createAction } from 'redux-actions';

import type Item from '../poe/ModContainer/Item';
import type Mod from '../poe/Mod/';
import type { ItemClassProps } from '../poe/data/schema';

export const setItem = createAction('SET_ITEM', (item: Item) => item);

export const setItemClass = createAction(
  'SET_ITEM_CLASS',
  (item_class: ItemClassProps) => item_class
);

export const addMod = createAction('ADD_MOD', (mod: Mod) => mod);
export const removeMod = createAction('REMOVE_MOD', (mod: Mod) => mod);
