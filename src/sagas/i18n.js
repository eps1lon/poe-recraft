// @flow
import { all, call, fork, put, take } from 'redux-saga/effects';

import { changeLocale, setDescriptions, setMessages } from 'actions/i18n';

const requireLocaleData = locale => {
  return new Promise((resolve, reject) => {
    // webpack can only evaluate certain expressions!
    // $FlowFixMe
    require([
      'poe-i18n/locale-data/' + locale + '/stat_descriptions.json',
      'poe-i18n/locale-data/' + locale + '/BaseItemTypes.json'
    ], (stat_descriptions, baseitemtypes) => {
      resolve({ baseitemtypes, stat_descriptions });
    });
  });
};

function* loadLocaleData(): Generator<*, *, *> {
  while (true) {
    const { payload: locale } = yield take(changeLocale.toString());
    const { baseitemtypes, stat_descriptions } = yield call(
      requireLocaleData,
      locale
    );

    yield put(setMessages({ poe: { baseitemtypes } }));
    yield put(setDescriptions({ stat_descriptions }));
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(loadLocaleData)]);
}
