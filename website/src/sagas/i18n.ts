import { all, call, fork, put, take } from 'redux-saga/effects';

import { i18n_actions } from 'state/actions';
import { messages as default_messages } from '../locales/default';

const requireLocaleData = (locale: string) => {
  return import(
    /* webpackChunkName: "i18n/[request]" */ `../locales/${locale}`
  );
};

function* loadLocaleData() {
  while (true) {
    const { payload: locale } = yield take(i18n_actions.Type.CHANGE);
    const {
      baseitemtypes,
      item_classes,
      messages = {},
      mods,
      stat_descriptions,
      api_messages = {},
    } = yield call(requireLocaleData, locale);

    yield put(
      i18n_actions.setMessages({
        poe: { baseitemtypes, item_classes, mods, api: api_messages },
        ...default_messages,
        ...messages,
      }),
    );
    yield put(i18n_actions.setDescriptions({ stat_descriptions }));
    // set last to trigger re-render
    yield put(i18n_actions.setLocale(locale));
  }
}

export default function* root() {
  yield all([fork(loadLocaleData)]);
}
