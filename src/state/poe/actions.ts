import { RSAA, RSAAction } from 'redux-api-middleware';

import { Action } from 'util/redux';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  EssenceProps,
  ModProps,
  NormalizedEssenceProps,
  TagProps
} from './schema';
import { apiEndpoint } from './selectors';

export enum Type {
  ITEMS_REQUEST = 'POE/ITEMS_REQUEST',
  ITEMS_SUCCESS = 'POE/ITEMS_SUCCESS',
  ITEMS_FAILURE = 'POE/ITEMS_FAILURE',
  BENCHS_REQUEST = 'POE/BENCHS_REQUEST',
  BENCHS_SUCCESS = 'POE/BENCHS_SUCCESS',
  BENCHS_FAILURE = 'POE/BENCHS_FAILURE',
  MODS_REQUEST = 'POE/MODS_REQUEST',
  MODS_SUCCESS = 'POE/MODS_SUCCESS',
  MODS_FAILURE = 'POE/MODS_FAILURE',
  TAGS_REQUEST = 'POE/TAGS_REQUEST',
  TAGS_SUCCESS = 'POE/TAGS_SUCCESS',
  TAGS_FAILURE = 'POE/TAGS_FAILRE',
  ESSENCES_REQUEST = 'POE/ESSENCES_REQUEST',
  ESSENCES_SUCCESS = 'POE/ESSENCES_SUCCESS',
  ESSENCES_FAILURE = 'POE/ESSENCES_FAILURE'
}

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

export function getItems() {
  return getEndpoint('data/baseitemtypes.json', 'ITEMS');
}

export function getBenchoptions() {
  return getEndpoint('data/craftingbenchoptions.json', 'BENCHS');
}

export function getMods() {
  return getEndpoint('data/mods.json', 'MODS');
}

export function getTags() {
  return getEndpoint('data/tags.json', 'TAGS');
}

export function getEssences() {
  return getEndpoint('data/essences.json', 'ESSENCES');
}
