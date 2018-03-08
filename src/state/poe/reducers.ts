import { Action, Type } from './actions';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps
} from './schema';

export type State = {
  api_root: string;
  items: BaseItemTypeProps[];
  benchoptions: CraftingBenchOptionsProps[];
  mods: ModProps[];
  tags: TagProps[];
  version: string;
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
export default function reducer(state: State = initial, action: Action): State {
  switch (action.type) {
    case Type.ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case Type.BENCH_SUCCESS:
      return {
        ...state,
        benchoptions: action.payload
      };
    case Type.MODS_SUCCESS:
      return {
        ...state,
        mods: action.payload
      };
    case Type.TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
}
