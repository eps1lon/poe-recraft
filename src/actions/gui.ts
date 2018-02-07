import { Action, NullableAction } from 'util/redux';
export type GuiIdent = string;

export enum Type {
  COLLAPSE = 'COLLAPSE',
  EXPAND = 'EXPAND',
  TOGGLE = 'TOGGLE',
  SET_TABLE_EXPANDED = 'SET_TABLE_EXPANDED',
  TOGGLE_GENERATOR_MODAL = 'TOGGLE_GENERATOR_MODAL',
  TOGGLE_BASEITEM_MODAL = 'TOGGLE_BASEITEM_MODAL',
  TOGGLE_EDITITEM_MODAL = 'TOGGLE_EDITITEM_MODAL'
}

export type Action =
  | CollapseAction
  | ExpandAction
  | ToggleAction
  | SetTableExpandedAction
  | ToggleGeneratorModalAction
  | ToggleBaseItemModalAction
  | ToggleEditItemModalAction;

export type ReactTableExpanded = {
  [key: number]: ReactTableExpanded | boolean;
};

export type CollapseAction = Action<Type.COLLAPSE, GuiIdent>;
export const collapse = (component: GuiIdent): CollapseAction => ({
  type: Type.COLLAPSE,
  payload: component
});

export type ExpandAction = Action<Type.EXPAND, GuiIdent>;
export const expand = (component: GuiIdent): ExpandAction => ({
  type: Type.EXPAND,
  payload: component
});

export type ToggleAction = Action<Type.TOGGLE, GuiIdent>;
export const toggle = (component: GuiIdent): ToggleAction => ({
  type: Type.TOGGLE,
  payload: component
});

export type SetTableExpandedAction = Action<
  Type.SET_TABLE_EXPANDED,
  { component: GuiIdent; expanded: ReactTableExpanded }
>;
export const setTableExpanded = (
  component: GuiIdent,
  expanded: ReactTableExpanded
): SetTableExpandedAction => ({
  type: Type.SET_TABLE_EXPANDED,
  payload: {
    component,
    expanded
  }
});

export type ToggleGeneratorModalAction = NullableAction<
  Type.TOGGLE_GENERATOR_MODAL
>;
export const toggleGeneratorModal = (): ToggleGeneratorModalAction => ({
  type: Type.TOGGLE_GENERATOR_MODAL
});

export type ToggleBaseItemModalAction = NullableAction<
  Type.TOGGLE_BASEITEM_MODAL
>;
export const toggleBaseItemModal = (): ToggleBaseItemModalAction => ({
  type: Type.TOGGLE_BASEITEM_MODAL
});

export type ToggleEditItemModalAction = NullableAction<
  Type.TOGGLE_EDITITEM_MODAL
>;
export const toggleEditItemModal = (): ToggleEditItemModalAction => ({
  type: Type.TOGGLE_EDITITEM_MODAL
});
