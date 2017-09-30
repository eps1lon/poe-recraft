// @flow
import type { Dispatch } from 'redux';

import { collapse, setTableExpanded } from 'actions/gui';
import type { GuiIdent, ReactTableExpanded } from 'reducers/gui/expanded';

export type ExpandedHandles = {
  onCollapse: GuiIdent => any,
  onTableExpandedChange: (GuiIdent, ReactTableExpanded) => any
};
export const expanded = (dispatch: Dispatch<*>): ExpandedHandles => {
  return {
    onCollapse: (ident: GuiIdent) => dispatch(collapse(ident)),
    onTableExpandedChange: (ident: GuiIdent, expanded: ReactTableExpanded) =>
      dispatch(setTableExpanded(ident, expanded))
  };
};

export type GuiHandles = ExpandedHandles;
const gui = (dispatch: Dispatch<*>): GuiHandles => {
  return {
    ...expanded(dispatch)
  };
};

export default gui;
