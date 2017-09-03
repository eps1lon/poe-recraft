// @flow

export type State = {
  api_root: string
};

const initial: State = {
  api_root: 'http://localhost:3000/'
};

const reducer = (state: State = initial): State => state;

export default reducer;
