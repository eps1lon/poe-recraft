// @flow
import type {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  MetaDataMap,
  ModProps
} from 'poe-mods/lib/schema';

import type { Action } from '../actions/poe';

export type State = {
  api_root: string,
  items: BaseItemTypeProps[],
  benchoptions: CraftingBenchOptionsProps[],
  metadata: MetaDataMap,
  mods: ModProps[],
  version: string
};

const initial: State = {
  api_root: 'http://localhost:3000/',
  items: [],
  benchoptions: [],
  metadata: {},
  mods: [],
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
    case 'POE/META_DATA_SUCCESS':
      return {
        ...state,
        metadata: action.payload
      };
    case 'POE/MODS_SUCCESS':
      return {
        ...state,
        mods: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
