// @flow
import type {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps
} from 'selectors/schema';

import type { Action } from 'actions/poe';

export type State = {
  api_root: string,
  items: BaseItemTypeProps[],
  benchoptions: CraftingBenchOptionsProps[],
  mods: ModProps[],
  tags: TagProps[],
  version: string
};

const initial: State = {
  api_root: '.',
  items: [],
  benchoptions: [],
  mods: [],
  tags: [],
  version: '3.0.1c'
};

// TODO add normalizr
const reducer = (state: State = initial, action: Action): State => {
  switch (action.type) {
    case 'POE/ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload
      };
    case 'POE/BENCH_SUCCESS':
      return {
        ...state,
        benchoptions: action.payload
      };
    case 'POE/MODS_SUCCESS':
      return {
        ...state,
        mods: action.payload
      };
    case 'POE/TAGS_SUCCESS':
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
