// @flow
import flatten from 'flat';
import { handleActions } from 'redux-actions';

import {
  setDescriptions,
  type SetDescriptionsAction,
  setLocale,
  type SetLocaleAction,
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
    [setDescriptions.toString()]: setDescriptionsHandle,
    [setLocale.toString()]: setLocaleHandle,
    [setMessages.toString()]: setMessagesHandle
  },
  initial
);

function setLocaleHandle(state: State, action: SetLocaleAction): State {
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
