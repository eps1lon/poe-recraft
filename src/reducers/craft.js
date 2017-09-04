// @flow
import type { Action as CraftAction } from '../actions/craft';
import type { BaseItemTypeProps } from '../poe/data/schema';
import type ModGenerator from '../poe/ModGenerator/';

import { SET_GENERATOR } from '../actions/craft';

export type State = {
  itemclass: ?string,
  baseitem: ?BaseItemTypeProps,
  mod_generator: ?ModGenerator<*>
};

const initial: State = {
  itemclass: undefined,
  baseitem: undefined,
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

export default reducer;
