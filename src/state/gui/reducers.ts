import { combineReducers, Reducer } from 'redux';

import expanded, { ExpandedState } from './expanded';

export interface State {
  expanded: ExpandedState;
}

const gui: Reducer<State> = combineReducers({ expanded });

export default gui;
