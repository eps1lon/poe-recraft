// @flow
import { combineReducers } from 'redux';

import expanded, { type State as ExpandedState } from './expanded';

export type State = {
  expanded: ExpandedState
};

const gui = combineReducers({ expanded });

export default gui;
