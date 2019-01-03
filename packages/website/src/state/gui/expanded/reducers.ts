import { GuiIdent } from '../types';
import * as actions from './actions';

export type State = Map<GuiIdent, boolean>;

const initial: State = new Map().set('implicits', false);

export default function(state: State = initial, action: actions.Action) {
  switch (action.type) {
    case actions.Type.COLLAPSE:
      return collapseHandle(state, action);
    case actions.Type.EXPAND:
      return expandHandle(state, action);
    case actions.Type.TOGGLE:
      return toggleHandle(state, action);
    case actions.Type.TOGGLE_BASEITEM_MODAL:
      return toggleBaseItemModalHandle(state);
    case actions.Type.TOGGLE_EDITITEM_MODAL:
      return toggleEditItemModalHandle(state);
    case actions.Type.TOGGLE_GENERATOR_MODAL:
      return toggleGeneratorModalHandle(state);
    default:
      return state;
  }
}

function collapseHandle(
  state: State = initial,
  action: actions.CollapseAction
): State {
  const { payload: ident } = action;

  return new Map(state).set(ident, false);
}

function expandHandle(
  state: State = initial,
  action: actions.ExpandAction
): State {
  const { payload: ident } = action;

  return new Map(state).set(ident, true);
}

function toggleHandle(
  state: State = initial,
  action: actions.ToggleAction
): State {
  const { payload: ident } = action;

  return new Map(state).set(ident, !Boolean(state.get(ident)));
}

function toggleGeneratorModalHandle(state: State): State {
  return new Map(state).set(
    'generator-modal',
    !Boolean(state.get('generator-modal'))
  );
}

function toggleBaseItemModalHandle(state: State): State {
  return new Map(state).set(
    'baseitem-modal',
    !Boolean(state.get('baseitem-modal'))
  );
}

function toggleEditItemModalHandle(state: State): State {
  return new Map(state).set(
    'edititem-modal',
    !Boolean(state.get('edititem-modal'))
  );
}
