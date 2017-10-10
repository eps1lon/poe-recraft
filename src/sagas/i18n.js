// @flow
import { all, call, fork, put, select, take } from 'redux-saga/effects';

import { changeLocale, setMessages } from 'actions/i18n';

const requireLocaleData = locale => {
  return new Promise((resolve, reject) => {
    // webpack can only evaluate certain expressions!
    // $FlowFixMe
    require([
      'poe-i18n/locale-data/' + locale + '/stat_descriptions.json'
    ], stat_descriptions => {
      resolve({ stat_descriptions });
    });
  });
};

function* loadLocaleData(): Generator<*, *, *> {
  while (true) {
    const { payload: locale } = yield take(changeLocale.toString());
    const { stat_descriptions } = yield call(requireLocaleData, locale);
    yield put(setMessages({ poe: { descriptions: { stat_descriptions } } }));
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(loadLocaleData)]);
}
