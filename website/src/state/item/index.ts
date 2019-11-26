import * as actions from './actions';
import reducer, {
  initial as initial_state,
  State as StateType,
} from './reducers';
import * as selectors from './selectors';

export type State = StateType;
export { actions, selectors, initial_state };
export default reducer;
