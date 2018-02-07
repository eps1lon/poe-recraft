import { State as PoeState } from 'reducers/poe';

type State = {
  poe: PoeState;
};

export function apiEndpoint(endpoint: string): (state: State) => string {
  return (state: State) => `${state.poe.api_root}/${endpoint}`;
}
