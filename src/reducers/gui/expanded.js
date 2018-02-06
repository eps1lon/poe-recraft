// @flow
import { handleActions } from 'redux-actions';

import {
  collapse,
  type CollapseAction,
  expand,
  type ExpandAction,
  toggle,
  type ToggleAction,
  setTableExpanded,
  type SetTableExpandedAction,
  toggleGeneratorModal,
  type ToggleGeneratorModalAction,
  toggleBaseItemModal,
  type ToggleBaseItemModal,
  toggleEditItemModal,
  type ToggleEditItemModal
} from 'actions/gui';

export type GuiIdent = string;

export type ReactTableExpanded = {
  [number]: ReactTableExpanded | boolean
};

export type State = {
  misc: Map<GuiIdent, boolean>,
  tables: Map<GuiIdent, ReactTableExpanded>
};

const initial: State = {
  misc: new Map().set('implicits', false),
  tables: new Map()
};

export default handleActions(
  {
    [collapse.toString()]: collapseHandle,
    [expand.toString()]: expandHandle,
    [toggle.toString()]: toggleHandle,
    [setTableExpanded.toString()]: setTableExpandedHandle,
    [toggleGeneratorModal.toString()]: toggleGeneratorModalHandle,
    [toggleBaseItemModal.toString()]: toggleBaseItemModalHandle,
    [toggleEditItemModal.toString()]: toggleEditItemModalHandle
  },
  initial
);

function collapseHandle(state: State = initial, action: CollapseAction): State {
  const { payload: ident } = action;

  return {
    ...state,
    misc: new Map(state.misc).set(ident, false)
  };
}

function expandHandle(state: State = initial, action: ExpandAction): State {
  const { payload: ident } = action;

  return {
    ...state,
    misc: new Map(state.misc).set(ident, true)
  };
}

function toggleHandle(state: State = initial, action: ToggleAction): State {
  const { payload: ident } = action;

  return {
    ...state,
    misc: new Map(state.misc).set(ident, !Boolean(state.misc.get(ident)))
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

function toggleGeneratorModalHandle(
  state: State,
  action: ToggleGeneratorModalAction
): State {
  return {
    ...state,
    misc: state.misc.set(
      'generator-modal',
      !Boolean(state.misc.get('generator-modal'))
    )
  };
}

function toggleBaseItemModalHandle(
  state: State,
  action: ToggleBaseItemModal
): State {
  return {
    ...state,
    misc: state.misc.set(
      'baseitem-modal',
      !Boolean(state.misc.get('baseitem-modal'))
    )
  };
}

function toggleEditItemModalHandle(
  state: State,
  action: ToggleEditItemModal
): State {
  return {
    ...state,
    misc: state.misc.set(
      'edititem-modal',
      !Boolean(state.misc.get('edititem-modal'))
    )
  };
}
