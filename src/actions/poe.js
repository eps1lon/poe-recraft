// @flow
import { RSAA } from 'redux-api-middleware';

import { apiEndpoint } from 'selectors/poe';
import type {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps
} from 'selectors/schema';

function getEndpoint(endpoint: string, name: string) {
  return {
    [RSAA]: {
      endpoint: apiEndpoint(endpoint),
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'].map(
        type => `POE/${name}_${type}`
      )
    }
  };
}

export type ItemsSuccessAction = {
  type: 'POE/ITEMS_SUCCESS',
  payload: BaseItemTypeProps[]
};
export function getItems() {
  return getEndpoint('data/baseitemtypes.json', 'ITEMS');
}

export type BenchSuccessAction = {
  type: 'POE/BENCH_SUCCESS',
  payload: CraftingBenchOptionsProps[]
};
export function getBenchoptions() {
  return getEndpoint('data/craftingbenchoptions.json', 'BENCH');
}

export type ModsSuccessAction = {
  type: 'POE/MODS_SUCCESS',
  payload: ModProps[]
};
export function getMods() {
  return getEndpoint('data/mods.json', 'MODS');
}

export type TagsSuccessAction = {
  type: 'POE/TAGS_SUCCESS',
  payload: TagProps[]
};
export function getTags() {
  return getEndpoint('data/tags.json', 'TAGS');
}

export type Action =
  | ItemsSuccessAction
  | BenchSuccessAction
  | ModsSuccessAction
  | TagsSuccessAction;
