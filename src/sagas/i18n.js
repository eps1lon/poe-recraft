// @flow
import { addLocaleData } from 'react-intl';
import { all, call, fork, put, take } from 'redux-saga/effects';

import { changeLocale, setDescriptions, setMessages } from 'actions/i18n';

const requireLocaleData = locale => {
  return new Promise((resolve, reject) => {
    // webpack can only evaluate certain expressions!
    // $FlowFixMe
    require([
      'react-intl/locale-data/' + locale,
      'poe-i18n/locale-data/' + locale + '/stat_descriptions.json',
      'poe-i18n/locale-data/' + locale + '/BaseItemTypes.json'
    ], (locale_data, stat_descriptions, baseitemtypes) => {
      resolve({ baseitemtypes, locale_data, stat_descriptions });
    });
  });
};

function* loadLocaleData(): Generator<*, *, *> {
  while (true) {
    const { payload: locale } = yield take(changeLocale.toString());
    const { baseitemtypes, locale_data, stat_descriptions } = yield call(
      requireLocaleData,
      locale
    );

    yield call(addLocaleData, locale_data);
    yield put(setMessages({ poe: { baseitemtypes } }));
    yield put(setDescriptions({ stat_descriptions }));
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(loadLocaleData)]);
}
