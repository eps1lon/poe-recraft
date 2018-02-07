import flatten from 'flat';

import {
  Type,
  Action,
  setDescriptions,
  SetDescriptionsAction,
  setLocale,
  SetLocaleAction,
  setMessages,
  SetMessagesAction
} from 'actions/i18n';

export type State = {
  locale: string;
  descriptions: {};
  messages: {
    [key: string]: string;
  };
};

const initial: State = {
  locale: 'en',
  descriptions: {},
  messages: {}
};

export default function reducer(state: State = initial, action: Action): State {
  switch (action.type) {
    case Type.SET_DESCRIPTIONS:
      return setDescriptionsHandle(state, action);
    case Type.SET_LOCALE:
      return setLocaleHandle(state, action);
    case Type.SET_MESSAGES:
      return setMessagesHandle(state, action);
    default:
      return state;
  }
}

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
