import {
  Action,
  Type,
  collapse,
  CollapseAction,
  expand,
  ExpandAction,
  toggle,
  ToggleAction,
  setTableExpanded,
  SetTableExpandedAction,
  toggleGeneratorModal,
  ToggleGeneratorModalAction,
  toggleBaseItemModal,
  ToggleBaseItemModalAction,
  toggleEditItemModal,
  ToggleEditItemModalAction,
  ReactTableExpanded,
  GuiIdent
} from 'actions/gui';
import { handleActions } from 'util/redux';

export type State = {
  misc: Map<GuiIdent, boolean>;
  tables: Map<GuiIdent, ReactTableExpanded>;
};

const initial: State = {
  misc: new Map().set('implicits', false),
  tables: new Map()
};

export default function(state: State = initial, action: Action) {
  switch (action.type) {
    case Type.COLLAPSE:
      return collapseHandle(state, action);
    case Type.EXPAND:
      return expandHandle(state, action);
    case Type.SET_TABLE_EXPANDED:
      return setTableExpandedHandle(state, action);
    case Type.TOGGLE:
      return toggleHandle(state, action);
    case Type.TOGGLE_BASEITEM_MODAL:
      return toggleBaseItemModalHandle(state, action);
    case Type.TOGGLE_EDITITEM_MODAL:
      return toggleEditItemModalHandle(state, action);
    case Type.TOGGLE_GENERATOR_MODAL:
      return toggleGeneratorModalHandle(state, action);
    default:
      return state;
  }
}

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
  action: ToggleBaseItemModalAction
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
  action: ToggleEditItemModalAction
): State {
  return {
    ...state,
    misc: state.misc.set(
      'edititem-modal',
      !Boolean(state.misc.get('edititem-modal'))
    )
  };
}
