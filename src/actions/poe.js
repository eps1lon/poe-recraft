// @flow
import { RSAA } from 'redux-api-middleware';

import type {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  MetaDataMap,
  ModProps
} from '../poe/data/schema';

import { apiEndpoint } from '../selectors/poe';

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

export type MetadataSuccessAction = {
  type: 'POE/META_DATA_SUCCESS',
  payload: MetaDataMap
};
export function getMetadata() {
  return getEndpoint('data/meta_data.json', 'META_DATA');
}

export type ModsSuccessAction = {
  type: 'POE/MODS_SUCCESS',
  payload: ModProps[]
};
export function getMods() {
  return getEndpoint('data/mods.json', 'MODS');
}

export type Action =
  | ItemsSuccessAction
  | BenchSuccessAction
  | MetadataSuccessAction
  | ModsSuccessAction;
