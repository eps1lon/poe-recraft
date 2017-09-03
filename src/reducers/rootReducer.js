// @flow
import { combineReducers } from 'redux';

import type { State as PoeState } from './poe';

import poe from './poe';

export type State = {
  poe: PoeState
};

export default combineReducers({ poe });
