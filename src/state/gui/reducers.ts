import { combineReducers } from 'redux';

import expanded, { ExpandedState } from './expanded';

export interface State {
  expanded: ExpandedState;
}

const gui = combineReducers({ expanded });

export default gui;
