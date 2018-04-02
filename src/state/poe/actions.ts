import { RSAA, RSAAction } from 'redux-api-middleware';

import { Action } from 'util/redux';
import { apiEndpoint } from './selectors';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps,
  EssenceProps,
  NormalizedEssenceProps
} from './schema';

export enum Type {
  ITEMS_SUCCESS = 'POE/ITEMS_SUCCESS',
  BENCH_SUCCESS = 'POE/BENCH_SUCCESS',
  MODS_SUCCESS = 'POE/MODS_SUCCESS',
  TAGS_SUCCESS = 'POE/TAGS_SUCCESS',
  ESSENCES_SUCCESS = 'POE/ESSENCES_SUCCESS'
}

export type Action =
  | ItemsSuccessAction
  | BenchSuccessAction
  | ModsSuccessAction
  | TagsSuccessAction
  | EssencesSuccessAction;

function getEndpoint(endpoint: string, name: string): RSAAction<any, any, any> {
  return {
    [RSAA]: {
      endpoint: apiEndpoint(endpoint),
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'].map(
        type => `POE/${name}_${type}`
      )
    }
  } as RSAAction<any, any, any>;
}

export type ItemsSuccessAction = Action<
  Type.ITEMS_SUCCESS,
  BaseItemTypeProps[]
>;
export function getItems() {
  return getEndpoint('data/baseitemtypes.json', 'ITEMS');
}

export type BenchSuccessAction = Action<
  Type.BENCH_SUCCESS,
  CraftingBenchOptionsProps[]
>;
export function getBenchoptions() {
  return getEndpoint('data/craftingbenchoptions.json', 'BENCH');
}

export type ModsSuccessAction = Action<Type.MODS_SUCCESS, ModProps[]>;
export function getMods() {
  return getEndpoint('data/mods.json', 'MODS');
}

export type TagsSuccessAction = Action<Type.TAGS_SUCCESS, TagProps[]>;
export function getTags() {
  return getEndpoint('data/tags.json', 'TAGS');
}

export type EssencesSuccessAction = Action<
  Type.ESSENCES_SUCCESS,
  NormalizedEssenceProps[]
>;
export function getEssences() {
  return getEndpoint('data/essences.json', 'ESSENCES');
}
