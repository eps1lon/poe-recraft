import { Action as ReduxAction } from 'util/redux';

import { GuiIdent } from '../types';

export type SortByIdentifier = number | string;

export type Action = SortAscending | SortDescending;

export enum Type {
  ASC = 'GUI/SORT/ASC',
  DESC = 'GUI/SORT/DESC',
}

export interface SortPayload {
  id: GuiIdent;
  by: SortByIdentifier;
}

export type SortAscending = ReduxAction<Type.ASC, SortPayload>;
export const sortAsc = (
  component: GuiIdent,
  by: SortByIdentifier,
): SortAscending => ({
  type: Type.ASC,
  payload: {
    id: component,
    by,
  },
});

export type SortDescending = ReduxAction<Type.DESC, SortPayload>;
export const sortDesc = (
  component: GuiIdent,
  by: SortByIdentifier,
): SortDescending => ({
  type: Type.DESC,
  payload: {
    id: component,
    by,
  },
});
