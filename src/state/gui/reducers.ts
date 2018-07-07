import { combineReducers, Reducer } from 'redux';

import expanded, { ExpandedState } from './expanded';
import sort, { State as SortState } from './sort';

export interface State {
  expanded: ExpandedState;
  sort: SortState;
}

const gui: Reducer<State> = combineReducers({ expanded, sort });

export default gui;
