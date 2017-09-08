// @flow
import { combineReducers } from 'redux';

import type { State as CraftState } from './craft';
import type { State as PoeState } from './poe';

import craft from './craft';
import gui, { type State as GuiState } from './gui/';
import poe from './poe';

export type State = {
  craft: CraftState,
  gui: GuiState,
  poe: PoeState
};

export default combineReducers({ craft, gui, poe });
