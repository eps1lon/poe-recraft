import { GuiIdent } from '../types';
import * as actions from './actions';

export type SortOrder = 'asc' | 'desc';
export interface Sorting {
  by: actions.SortByIdentifier;
  order: SortOrder;
}

export type State = Map<GuiIdent, Sorting>;

const initial: State = new Map();

export default function reducer(
  state: State = initial,
  action: actions.Action
): State {
  switch (action.type) {
    case actions.Type.ASC:
      return sortAscHandle(state, action);
    case actions.Type.DESC:
      return sortDescHandle(state, action);
  }
  return state;
}

function sortAscHandle(state: State, action: actions.SortAscending): State {
  const { by, id } = action.payload;
  return new Map(state).set(id, { by, order: 'asc' });
}

function sortDescHandle(state: State, action: actions.SortDescending): State {
  const { by, id } = action.payload;
  return new Map(state).set(id, { by, order: 'desc' });
}
