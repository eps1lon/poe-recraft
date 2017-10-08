// @flow
import type { Mod } from 'poe-mods';
import { createAction } from 'redux-actions';

import type { BaseItemTypeProps } from 'selectors/schema';

export const setItem = createAction(
  'SET_ITEM',
  (item: BaseItemTypeProps) => item
);

export const setRarity = createAction(
  'SET_RARITY',
  (rarity: 'normal' | 'magic' | 'rare') => rarity
);

export const addMod = createAction('ADD_MOD', (mod: Mod) => mod);
export const removeMod = createAction('REMOVE_MOD', (mod: Mod) => mod);
