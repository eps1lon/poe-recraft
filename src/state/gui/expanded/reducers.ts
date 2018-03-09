import {
  Action,
  Type,
  collapse,
  CollapseAction,
  expand,
  ExpandAction,
  toggle,
  ToggleAction,
  toggleGeneratorModal,
  ToggleGeneratorModalAction,
  toggleBaseItemModal,
  ToggleBaseItemModalAction,
  toggleEditItemModal,
  ToggleEditItemModalAction,
  ReactTableExpanded,
  GuiIdent
} from './actions';
import { handleActions } from 'util/redux';

export type State = Map<GuiIdent, boolean>;

const initial: State = new Map().set('implicits', false);

export default function(state: State = initial, action: Action) {
  switch (action.type) {
    case Type.COLLAPSE:
      return collapseHandle(state, action);
    case Type.EXPAND:
      return expandHandle(state, action);
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

  return new Map(state).set(ident, false);
}

function expandHandle(state: State = initial, action: ExpandAction): State {
  const { payload: ident } = action;

  return new Map(state).set(ident, true);
}

function toggleHandle(state: State = initial, action: ToggleAction): State {
  const { payload: ident } = action;

  return new Map(state).set(ident, !Boolean(state.get(ident)));
}

function toggleGeneratorModalHandle(
  state: State,
  action: ToggleGeneratorModalAction
): State {
  return new Map(state).set(
    'generator-modal',
    !Boolean(state.get('generator-modal'))
  );
}

function toggleBaseItemModalHandle(
  state: State,
  action: ToggleBaseItemModalAction
): State {
  return new Map(state).set(
    'baseitem-modal',
    !Boolean(state.get('baseitem-modal'))
  );
}

function toggleEditItemModalHandle(
  state: State,
  action: ToggleEditItemModalAction
): State {
  return new Map(state).set(
    'edititem-modal',
    !Boolean(state.get('edititem-modal'))
  );
}
