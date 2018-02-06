// @flow
import { createAction, type ReduxActionType } from 'redux-actions';
import type { GuiIdent, ReactTableExpanded } from 'reducers/gui/expanded';

export const collapse = createAction(
  'COLLAPSE',
  (component: GuiIdent) => component
);
export type CollapseAction = ReduxActionType<typeof collapse>;

export const expand = createAction(
  'EXPAND',
  (component: GuiIdent) => component
);
export type ExpandAction = ReduxActionType<typeof expand>;

export const toggle = createAction(
  'TOGGLE',
  (component: GuiIdent) => component
);
export type ToggleAction = ReduxActionType<typeof toggle>;

export const setTableExpanded = createAction(
  'SET_TABLE_EXPANDED',
  (component: GuiIdent, expanded: ReactTableExpanded) => ({
    component,
    expanded
  })
);
export type SetTableExpandedAction = ReduxActionType<typeof setTableExpanded>;

export const toggleGeneratorModal = createAction(
  'TOGGLE_GENERATOR_MODAL',
  () => {}
);
export type ToggleGeneratorModalAction = ReduxActionType<
  typeof toggleGeneratorModal
>;

export const toggleBaseItemModal = createAction(
  'TOGGLE_BASEITEM_MODAL',
  () => {}
);
export type ToggleBaseItemModal = ReduxActionType<typeof toggleBaseItemModal>;

export const toggleEditItemModal = createAction(
  'TOGGLE_EDITITEM_MODAL',
  () => {}
);
export type ToggleEditItemModal = ReduxActionType<typeof toggleEditItemModal>;
