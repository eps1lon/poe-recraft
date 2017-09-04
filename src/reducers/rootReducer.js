// @flow
import { combineReducers } from 'redux';

import type { State as CraftState } from './craft';
import type { State as PoeState } from './poe';

import craft from './craft';
import poe from './poe';

export type State = {
  craft: CraftState,
  poe: PoeState
};

export default combineReducers({ craft, poe });
