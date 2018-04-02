import { Action, Type } from './actions';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  TagProps,
  NormalizedEssenceProps,
  ModId
} from './schema';

export type State = {
  api_root: string;
  items: BaseItemTypeProps[];
  benchoptions: CraftingBenchOptionsProps[];
  mods: { [key: string]: ModProps };
  tags: TagProps[];
  essences: NormalizedEssenceProps[];
  version: string;
};

const initial: State = {
  api_root: '.',
  items: [],
  benchoptions: [],
  mods: {},
  tags: [],
  essences: [],
  version: '3.2.0'
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
        mods: action.payload.reduce(
          (mods, mod) => {
            mods[mod.id] = mod;
            return mods;
          },
          {} as State['mods']
        )
      };
    case Type.TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    case Type.ESSENCES_SUCCESS:
      return {
        ...state,
        essences: action.payload
      };
    default:
      return state;
  }
}
