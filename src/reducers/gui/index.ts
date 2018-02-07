import { combineReducers } from 'redux';

import expanded, { State as ExpandedState } from './expanded';

export type State = {
  expanded: ExpandedState;
};

const gui = combineReducers({ expanded });

export default gui;
