// @flow
import { combineReducers } from 'redux';

import type { State as BaseitemfilterState } from './baseitemfilter';
import type { State as CraftState } from './craft';
import type { State as PoeState } from './poe';

import baseitemfilter from './baseitemfilter';
import craft from './craft';
import gui, { type State as GuiState } from './gui/';
import poe from './poe';

export type State = {
  baseitemfilter: BaseitemfilterState,
  craft: CraftState,
  gui: GuiState,
  poe: PoeState
};

export default combineReducers({ baseitemfilter, craft, gui, poe });
