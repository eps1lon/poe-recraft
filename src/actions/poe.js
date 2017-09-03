import { RSAA } from 'redux-api-middleware';

import { apiEndpoint } from '../selectors/poe';

export function getItems() {
  return {
    [RSAA]: {
      endpoint: state => {
        return apiEndpoint(state, 'data/baseitemtypes.json');
      },
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  };
}
