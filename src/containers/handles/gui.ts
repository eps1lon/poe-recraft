import { Dispatch } from 'redux';

import { collapse, setTableExpanded } from 'actions/gui';
import { GuiIdent, ReactTableExpanded } from 'actions/gui';

export type ExpandedHandles = {
  onCollapse: (id: GuiIdent) => any;
  onTableExpandedChange: (id: GuiIdent, expanded: ReactTableExpanded) => any;
};
export const expanded = (dispatch: Dispatch): ExpandedHandles => {
  return {
    onCollapse: (ident: GuiIdent) => dispatch(collapse(ident)),
    onTableExpandedChange: (
      ident: GuiIdent,
      changed_expanded: ReactTableExpanded
    ) => dispatch(setTableExpanded(ident, changed_expanded))
  };
};

export type GuiHandles = ExpandedHandles;
const gui = (dispatch: Dispatch): GuiHandles => {
  return {
    ...expanded(dispatch)
  };
};

export default gui;
