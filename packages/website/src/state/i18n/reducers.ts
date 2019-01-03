import flatten from 'flat';

import * as actions from './actions';

export interface State {
  locale: string;
  descriptions: {};
  messages: {
    [key: string]: string;
  };
}

const initial: State = {
  locale: 'en',
  descriptions: {},
  messages: {},
};

export default function reducer(
  state: State = initial,
  action: actions.Action,
): State {
  switch (action.type) {
    case actions.Type.SET_DESCRIPTIONS:
      return setDescriptionsHandle(state, action);
    case actions.Type.SET_LOCALE:
      return setLocaleHandle(state, action);
    case actions.Type.SET_MESSAGES:
      return setMessagesHandle(state, action);
    default:
      return state;
  }
}

function setLocaleHandle(state: State, action: actions.SetLocaleAction): State {
  return {
    ...state,
    locale: action.payload,
  };
}

function setDescriptionsHandle(
  state: State,
  action: actions.SetDescriptionsAction,
): State {
  return {
    ...state,
    descriptions: action.payload,
  };
}

function setMessagesHandle(
  state: State,
  action: actions.SetMessagesAction,
): State {
  return {
    ...state,
    messages: flatten(action.payload),
  };
}
