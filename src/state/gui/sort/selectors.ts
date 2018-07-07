import { GuiIdent } from '../types';
import { Sorting, State } from './reducer';

interface PartialState {
  gui: {
    sort: State;
  };
}

const genericDefaultSorting: Sorting = {
  by: -1,
  order: 'asc'
};

export const getSorting = (
  ident: GuiIdent,
  defaultSorting: Sorting = genericDefaultSorting
) => (state: PartialState) => {
  return state.gui.sort.get(ident) || defaultSorting;
};
