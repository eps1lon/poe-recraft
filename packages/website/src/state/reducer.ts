import { combineReducers, Reducer } from 'redux';

import baseitemfilter, { State as BaseitemfilterState } from './baseitemfilter';
import craft, { CraftState } from './craft';
import gui, { GuiState } from './gui/';
import i18n, { I18nState } from './i18n';
import poe, { PoeState } from './poe';

export interface State {
  baseitemfilter: BaseitemfilterState;
  craft: CraftState;
  gui: GuiState;
  i18n: I18nState;
  poe: PoeState;
}

const reducer: Reducer<State> = combineReducers({
  baseitemfilter,
  craft,
  gui,
  i18n,
  poe
});
export default reducer;
