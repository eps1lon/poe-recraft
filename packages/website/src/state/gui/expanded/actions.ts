import { Action, NullableAction } from 'util/redux';
import { GuiIdent } from '../types';

export enum Type {
  COLLAPSE = 'COLLAPSE',
  EXPAND = 'EXPAND',
  TOGGLE = 'TOGGLE',
  TOGGLE_GENERATOR_MODAL = 'TOGGLE_GENERATOR_MODAL',
  TOGGLE_BASEITEM_MODAL = 'TOGGLE_BASEITEM_MODAL',
  TOGGLE_EDITITEM_MODAL = 'TOGGLE_EDITITEM_MODAL'
}

export type Action =
  | CollapseAction
  | ExpandAction
  | ToggleAction
  | ToggleGeneratorModalAction
  | ToggleBaseItemModalAction
  | ToggleEditItemModalAction;

export interface ReactTableExpanded {
  [key: number]: ReactTableExpanded | boolean;
}

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
