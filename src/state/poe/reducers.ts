import { combineReducers, Reducer } from 'redux';

import createApiReducer, {
  State as ApiState
} from '../redux-api-middleware-reducer';
import { Type } from './actions';
import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  NormalizedEssenceProps,
  TagProps
} from './schema';

export interface State {
  benchoptions: ApiState<CraftingBenchOptionsProps[]>;
  essences: ApiState<NormalizedEssenceProps[]>;
  items: ApiState<BaseItemTypeProps[]>;
  mods: ApiState<{ [key: string]: ModProps }>;
  tags: ApiState<TagProps[]>;
}

const reducer: Reducer<State> = combineReducers({
  benchoptions: createApiReducer(
    [Type.BENCHS_REQUEST, Type.BENCHS_SUCCESS, Type.BENCHS_FAILURE],
    [],
    (options: CraftingBenchOptionsProps[]) => options
  ),
  essences: createApiReducer(
    [Type.ESSENCES_REQUEST, Type.ESSENCES_SUCCESS, Type.ESSENCES_FAILURE],
    [],
    (essences: NormalizedEssenceProps[]) => essences
  ),
  items: createApiReducer(
    [Type.ITEMS_REQUEST, Type.ITEMS_SUCCESS, Type.ITEMS_FAILURE],
    [],
    (items: BaseItemTypeProps[]) => items
  ),
  mods: createApiReducer(
    [Type.MODS_REQUEST, Type.MODS_SUCCESS, Type.MODS_FAILURE],
    {} as State['mods']['data'],
    (mods: ModProps[]) => {
      return mods.reduce(
        (obj, mod) => {
          obj[mod.id] = mod;
          return obj;
        },
        {} as State['mods']['data']
      );
    }
  ),
  tags: createApiReducer(
    [Type.TAGS_REQUEST, Type.TAGS_SUCCESS, Type.TAGS_FAILURE],
    [],
    (tags: TagProps[]) => tags
  )
});

export default reducer;
