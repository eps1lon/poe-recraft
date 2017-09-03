// @flow
import { RSAA } from 'redux-api-middleware';

import { apiEndpoint } from '../selectors/poe';

function getEndpoint(endpoint: string) {
  return {
    [RSAA]: {
      endpoint: apiEndpoint(endpoint),
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  };
}

export function getItems() {
  return getEndpoint('data/baseitemtypes.json');
}

export function getBenchoptions() {
  return getEndpoint('data/craftingbenchoptions.json');
}

export function getMetadata() {
  return getEndpoint('data/meta_data.json');
}

export function getMods() {
  return getEndpoint('data/mods.json');
}
