import * as actions from './actions';
import reducer, { State } from './reducers';
import * as selectors from './selectors';

export type CraftState = State;
export { actions, selectors };
export default reducer;
