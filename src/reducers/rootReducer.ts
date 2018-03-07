import { combineReducers, Reducer } from 'redux';

import baseitemfilter, { State as BaseitemfilterState } from './baseitemfilter';
import craft, { State as CraftState } from './craft';
import gui, { State as GuiState } from './gui/';
import i18n, { State as I18NState } from './i18n';
import poe, { State as PoeState } from './poe';

export type State = {
  baseitemfilter: BaseitemfilterState;
  craft: CraftState;
  gui: GuiState;
  i18n: I18NState;
  poe: PoeState;
};

export default combineReducers({
  baseitemfilter,
  craft,
  gui,
  i18n,
  poe
}) as Reducer<State>;
