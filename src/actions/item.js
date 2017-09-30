// @flow
import type { Item, Mod } from 'poe-mods';
import { createAction } from 'redux-actions';

import type { ItemClassProps } from 'selectors/schema';

export const setItem = createAction('SET_ITEM', (item: Item) => item);

export const setItemClass = createAction(
  'SET_ITEM_CLASS',
  (item_class: ItemClassProps) => item_class
);

export const setRarity = createAction(
  'SET_RARITY',
  (rarity: 'normal' | 'magic' | 'rare') => rarity
);

export const addMod = createAction('ADD_MOD', (mod: Mod) => mod);
export const removeMod = createAction('REMOVE_MOD', (mod: Mod) => mod);
