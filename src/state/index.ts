import { combineReducers, Reducer } from 'redux';

import baseitemfilter, { BaseitemFilterState } from './baseitemfilter';
import craft, { CraftState } from './craft';
import gui, { GuiState } from './gui/';
import i18n, { I18nState } from './i18n';
import poe, { PoeState } from './poe';

export interface State {
  baseitemfilter: BaseitemFilterState;
  craft: CraftState;
  gui: GuiState;
  i18n: I18nState;
  poe: PoeState;
}

export default combineReducers({
  baseitemfilter,
  craft,
  gui,
  i18n,
  poe
}) as Reducer<State>;
