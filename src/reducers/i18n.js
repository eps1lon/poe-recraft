// @flow
import { handleActions } from 'redux-actions';

import {
  changeLocale,
  type ChangeLocaleAction,
  setMessages,
  type SetMessagesAction
} from 'actions/i18n';

export type State = {
  locale: string,
  messages: {
    [key: string]: any,
    poe: {
      descriptions: {}
    }
  }
};

const initial: State = {
  locale: 'en',
  messages: {
    poe: {
      descriptions: {}
    }
  }
};

const reducer = handleActions(
  {
    [changeLocale.toString()]: changeLocaleHandle,
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

function setMessagesHandle(state: State, action: SetMessagesAction): State {
  return {
    ...state,
    messages: action.payload
  };
}

export default reducer;
