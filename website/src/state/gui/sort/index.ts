import * as actions from './actions';
import reducer, { State as StateType } from './reducer';
import * as selectors from './selectors';

export type State = StateType;
export { actions, selectors };
export default reducer;
