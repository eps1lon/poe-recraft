import { Mod } from 'poe-mods';
import { Action, NullableAction } from 'util/redux';

import { BaseItemTypeProps, TagProps } from 'selectors/schema';

export enum Type {
  SET_ITEM = 'ITEM/SET_ITEM',
  SET_RARITY = 'ITEM/SET_RARITY',
  ADD_MOD = 'ITEM/ADD_MOD',
  REMOVE_MOD = 'ITEM/REMOVE_MOD',
  ADD_TAG = 'ITEM/ADD_TAG',
  REMOVE_TAG = 'ITEM/REMOVE_TAG',
  AS_ELDER_ITEM = 'ITEM/AS_ELDER_ITEM',
  AS_SHAPER_ITEM = 'ITEM/AS_SHAPER_ITEM',
  REMOVE_ATLAS_MODIFIER = 'ITEM/REMOVE_ATLAS_MODIFIER'
}

export type Action =
  | SetItemAction
  | SetRarityAction
  | AddModAction
  | RemoveModAction
  | AddTagAction
  | RemoveTagAction
  | AsElderItemAction
  | AsShaperItemAction
  | RemoveAtlasModifierAction;

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

export type AsElderItemAction = NullableAction<Type.AS_ELDER_ITEM>;
export const asElderItem = (): AsElderItemAction => ({
  type: Type.AS_ELDER_ITEM
});

export type AsShaperItemAction = NullableAction<Type.AS_SHAPER_ITEM>;
export const asShaperItem = (): AsShaperItemAction => ({
  type: Type.AS_SHAPER_ITEM
});

export type RemoveAtlasModifierAction = NullableAction<
  Type.REMOVE_ATLAS_MODIFIER
>;
export const removeAtlasModifier = (): RemoveAtlasModifierAction => ({
  type: Type.REMOVE_ATLAS_MODIFIER
});
