// @flow
import { addLocaleData } from 'react-intl';
import { all, call, fork, put, take } from 'redux-saga/effects';

import {
  changeLocale,
  setDescriptions,
  setLocale,
  setMessages
} from 'actions/i18n';

const requireLocaleData = locale => {
  // $FlowFixMe
  return import(/* webpackChunkName: "i18n/[request]" */ `../i18n/${locale}`);
};

function* loadLocaleData(): Generator<*, *, *> {
  while (true) {
    const { payload: locale } = yield take(changeLocale.toString());
    const { baseitemtypes, locale_data, mods, stat_descriptions } = yield call(
      requireLocaleData,
      locale
    );

    yield call(addLocaleData, locale_data);
    yield put(setMessages({ poe: { baseitemtypes, mods } }));
    yield put(setDescriptions({ stat_descriptions }));
    // set last to trigger re-render
    yield put(setLocale(locale));
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(loadLocaleData)]);
}
