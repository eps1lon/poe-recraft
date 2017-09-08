// @flow
import { handleActions } from 'redux-actions';

import {
  collapse,
  type CollapseAction,
  setTableExpanded,
  type SetTableExpandedAction
} from '../../actions/gui';

export type GuiIdent = string;

export type ReactTableExpanded = {
  [number]: ReactTableExpanded | boolean
};

export type State = {
  misc: Map<GuiIdent, boolean>,
  tables: Map<GuiIdent, ReactTableExpanded>
};

const initial: State = {
  misc: new Map(),
  tables: new Map()
};

export default handleActions(
  {
    [collapse.toString()]: collapseHandle,
    [setTableExpanded.toString()]: setTableExpandedHandle
  },
  initial
);

function collapseHandle(state: State = initial, action: CollapseAction): State {
  const { payload: ident } = action;

  // cast undefined to false
  const expanded = Boolean(state.misc.get(ident));

  return {
    ...state,
    misc: new Map(state.misc).set(ident, !expanded)
  };
}

function setTableExpandedHandle(
  state: State = initial,
  action: SetTableExpandedAction
): State {
  const { payload: { component, expanded } } = action;

  return {
    ...state,
    tables: new Map(state.tables).set(component, expanded)
  };
}
