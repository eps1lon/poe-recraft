import * as actions from './actions';
import reducer, { State } from './reducers';
import * as selectors from './selectors';
import { GuiIdent as GuiIdentType } from './types';

export type GuiIdent = GuiIdentType;
export type GuiState = State;
export { actions, selectors };
export default reducer;
