// @flow
import reduceReducers from 'reduce-reducers';

import type { Action as CraftAction } from '../actions/craft';
import type Item from '../poe/ModContainer/Item';
import type ModGenerator from '../poe/ModGenerator/';

import { SET_GENERATOR } from '../actions/craft';
import item from './item';

export type State = {
  itemclass: ?string,
  item: ?Item,
  mod_generator: ?ModGenerator<*>
};

const initial: State = {
  itemclass: undefined,
  item: undefined,
  mod_generator: undefined
};

const reducer = (state: State = initial, action: CraftAction): State => {
  switch (action.type) {
    case SET_GENERATOR:
      return {
        ...state,
        mod_generator: action.payload
      };
    default:
      return state;
  }
};

export default reduceReducers(reducer, item);
