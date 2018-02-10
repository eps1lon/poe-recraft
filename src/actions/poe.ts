import { RSAA, RSAAction } from 'redux-api-middleware';

import { apiEndpoint } from 'selectors/poe';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps
} from 'selectors/schema';
import { Action } from 'util/redux';

export enum Type {
  ITEMS_SUCCESS = 'POE/ITEMS_SUCCESS',
  BENCH_SUCCESS = 'POE/BENCH_SUCCESS',
  MODS_SUCCESS = 'POE/MODS_SUCCESS',
  TAGS_SUCCESS = 'POE/TAGS_SUCCESS'
}

export type Action =
  | ItemsSuccessAction
  | BenchSuccessAction
  | ModsSuccessAction
  | TagsSuccessAction;

function getEndpoint(endpoint: string, name: string) {
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
