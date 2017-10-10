// @flow
import { createAction, type ReduxActionType } from 'redux-actions';

export const changeLocale = createAction(
  'I18N/CHANGE',
  (locale: string) => locale
);
export type ChangeLocaleAction = ReduxActionType<typeof changeLocale>;

export const setMessages = createAction(
  'I18N/SET_MESSAGES',
  (messages: any) => messages
);
export type SetMessagesAction = ReduxActionType<typeof setMessages>;
