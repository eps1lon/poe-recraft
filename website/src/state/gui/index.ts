import * as actions from './actions';
import reducer, { State } from './reducers';
import * as selectors from './selectors';
import { GuiIdent } from './types';

export type GuiIdent = GuiIdent;
export type GuiState = State;
export { actions, selectors };
export default reducer;
