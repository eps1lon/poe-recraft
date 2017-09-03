// @flow
import { RSAA } from 'redux-api-middleware';

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

export function getItems() {
  return getEndpoint('data/baseitemtypes.json', 'ITEMS');
}

export function getBenchoptions() {
  return getEndpoint('data/craftingbenchoptions.json', 'BENCH');
}

export function getMetadata() {
  return getEndpoint('data/meta_data.json', 'META_DATA');
}

export function getMods() {
  return getEndpoint('data/mods.json', 'MODS');
}
