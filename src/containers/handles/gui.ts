import { Dispatch } from 'redux';

import { gui_actions } from 'state/gui';

export type ExpandedHandles = {
  onCollapse: (id: gui_actions.GuiIdent) => any;
};
export const expanded = (dispatch: Dispatch): ExpandedHandles => {
  return {
    onCollapse: (ident: gui_actions.GuiIdent) =>
      dispatch(gui_actions.expanded_actions.collapse(ident))
  };
};

export type GuiHandles = ExpandedHandles;
const gui = (dispatch: Dispatch): GuiHandles => {
  return {
    ...expanded(dispatch)
  };
};

export default gui;