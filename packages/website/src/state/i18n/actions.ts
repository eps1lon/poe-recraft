import { Action } from 'util/redux';

export enum Type {
  CHANGE = 'I18N/CHANGE',
  SET_LOCALE = 'I18N/SET_LOCALE',
  SET_DESCRIPTIONS = 'I18N/SET_DESCRIPTIONS',
  SET_MESSAGES = 'I18N/SET_MESSAGES',
}

export type Action =
  | ChangeLocaleAction
  | SetLocaleAction
  | SetDescriptionsAction
  | SetMessagesAction;

export type ChangeLocaleAction = Action<Type.CHANGE, string>;
export const changeLocale = (locale: string): ChangeLocaleAction => ({
  type: Type.CHANGE,
  payload: locale,
});

export type SetLocaleAction = Action<Type.SET_LOCALE, string>;
export const setLocale = (locale: string): SetLocaleAction => ({
  type: Type.SET_LOCALE,
  payload: locale,
});

export type SetDescriptionsAction = Action<Type.SET_DESCRIPTIONS, any>;
export const setDescriptions = (descriptions: any): SetDescriptionsAction => ({
  type: Type.SET_DESCRIPTIONS,
  payload: descriptions,
});

export type SetMessagesAction = Action<Type.SET_MESSAGES, any>;
export const setMessages = (messages: any): SetMessagesAction => ({
  type: Type.SET_MESSAGES,
  payload: messages,
});
