import { Action, Reducer } from 'redux';

export enum LoadingState {
  requested,
  succeeded,
  failed
}

export interface State<T> {
  loading_state: LoadingState | undefined;
  data: T;
}

export function isRequested(state: State<any>) {
  return state.loading_state === LoadingState.requested;
}
export function isSucceeded(state: State<any>) {
  return state.loading_state === LoadingState.succeeded;
}
export function isFailed(state: State<any>) {
  return state.loading_state === LoadingState.failed;
}

export interface RequestAction<T> {
  type: T;
}
export interface SuccessAction<T, P> {
  type: T;
  payload: P;
}
export const createIsSuccessAction = <S, T>(success: S | any) => (
  action: RsaaAction<any, S, any, any>
): action is SuccessAction<S, T> => action.type === success;
export interface FailureAction<T> {
  type: T;
}
export type RsaaAction<R, S, F, P> =
  | RequestAction<R>
  | SuccessAction<S, P>
  | FailureAction<F>;

export default function createReducer<T, R, S, F, P>(
  states: [R, S, F],
  initial_data: T,
  handlePayload: (payload: P) => T
): Reducer<State<T>, RsaaAction<R, S, F, P>> {
  const initial: State<T> = {
    loading_state: undefined,
    data: initial_data
  };
  const isSuccessAction = createIsSuccessAction<S, P>(states[1]);

  return (
    state: State<T> = initial,
    action: RsaaAction<R, S, F, P>
  ): State<T> => {
    // for ts only to narrow down type
    if (isSuccessAction(action)) {
      return {
        ...state,
        data: handlePayload(action.payload),
        loading_state: LoadingState.succeeded
      };
    } else {
      switch (action.type) {
        case states[0]:
          return {
            ...state,
            loading_state: LoadingState.requested
          };
        case states[2]:
          return {
            ...state,
            loading_state: LoadingState.failed
          };
        default:
          return state;
      }
    }
  };
}
