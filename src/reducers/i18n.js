// @flow
import flatten from 'flat';
import { handleActions } from 'redux-actions';

import {
  changeLocale,
  type ChangeLocaleAction,
  setDescriptions,
  type SetDescriptionsAction,
  setMessages,
  type SetMessagesAction
} from 'actions/i18n';

export type State = {
  locale: string,
  descriptions: {},
  messages: {
    [key: string]: string
  }
};

const initial: State = {
  locale: 'en',
  descriptions: {},
  messages: {}
};

const reducer = handleActions(
  {
    [changeLocale.toString()]: changeLocaleHandle,
    [setDescriptions.toString()]: setDescriptionsHandle,
    [setMessages.toString()]: setMessagesHandle
  },
  initial
);

function changeLocaleHandle(state: State, action: ChangeLocaleAction): State {
  return {
    ...state,
    locale: action.payload
  };
}

function setDescriptionsHandle(
  state: State,
  action: SetDescriptionsAction
): State {
  return {
    ...state,
    descriptions: action.payload
  };
}

function setMessagesHandle(state: State, action: SetMessagesAction): State {
  return {
    ...state,
    messages: flatten(action.payload)
  };
}

export default reducer;
