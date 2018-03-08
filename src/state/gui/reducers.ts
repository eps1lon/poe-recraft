import { combineReducers } from 'redux';

import expanded, { ExpandedState } from './expanded';

export type State = {
  expanded: ExpandedState;
};

const gui = combineReducers({ expanded });

export default gui;
