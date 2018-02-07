// FSAA with non nullable payload

// cant infer A1 :(
export const createAction = <T, P, A1>(type: T, creator: (arg: A1) => P) => {
  return (arg: A1) => ({
    type,
    payload: creator(arg)
  });
};

export interface PayloadAction<T, P> {
  type: T;
  payload: P;
}
export interface NullableAction<T> {
  type: T;
}
export type Action<T, P> = PayloadAction<T, P>;
export type AnyAction = NullableAction<any>;
/*
 Microsoft/TypeScript#21316
export type Action<T, P = undefined> = 
  P extends undefined 
  ? NullableAction<T> 
  : PayloadAction<T, P>

 */

export type Reducer<S> = (state: S, action: AnyAction) => S;

export interface CommonReducerMap<S> {
  [key: string]: Reducer<S>;
}

export function handleActions<S>(
  reducer_map: CommonReducerMap<S>,
  initial: S
): Reducer<S> {
  return (state: S = initial, action: AnyAction) => {
    if (action.type in reducer_map) {
      return reducer_map[action.type](state, action);
    } else {
      return state;
    }
  };
}
