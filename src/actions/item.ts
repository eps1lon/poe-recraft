import { Mod } from 'poe-mods';
import { Action } from 'util/redux';

import { BaseItemTypeProps, TagProps } from 'selectors/schema';

export enum Type {
  SET_ITEM,
  SET_RARITY,
  ADD_MOD,
  REMOVE_MOD,
  ADD_TAG,
  REMOVE_TAG
}

export type Action =
  | SetItemAction
  | SetRarityAction
  | AddModAction
  | RemoveModAction
  | AddTagAction
  | RemoveTagAction;

export type SetItemAction = Action<Type.SET_ITEM, BaseItemTypeProps>;
export const setItem = (item: BaseItemTypeProps): SetItemAction => ({
  type: Type.SET_ITEM,
  payload: item
});

export type SetRarityAction = Action<
  Type.SET_RARITY,
  'normal' | 'magic' | 'rare'
>;
export const setRarity = (
  rarity: 'normal' | 'magic' | 'rare'
): SetRarityAction => ({
  type: Type.SET_RARITY,
  payload: rarity
});

export type AddModAction = Action<Type.ADD_MOD, Mod>;
export const addMod = (mod: Mod): AddModAction => ({
  type: Type.ADD_MOD,
  payload: mod
});

export type RemoveModAction = Action<Type.REMOVE_MOD, Mod>;
export const removeMod = (mod: Mod): RemoveModAction => ({
  type: Type.REMOVE_MOD,
  payload: mod
});

export type AddTagAction = Action<Type.ADD_TAG, TagProps>;
export const addTag = (tag: TagProps): AddTagAction => ({
  type: Type.ADD_TAG,
  payload: tag
});

export type RemoveTagAction = Action<Type.REMOVE_TAG, TagProps>;
export const removeTag = (tag: TagProps): RemoveTagAction => ({
  type: Type.REMOVE_TAG,
  payload: tag
});
