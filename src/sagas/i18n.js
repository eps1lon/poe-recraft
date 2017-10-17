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
  return new Promise((resolve, reject) => {
    // webpack can only evaluate certain expressions!
    // $FlowFixMe
    require([
      // only language code
      'react-intl/locale-data/' + locale.split('-')[0],
      'poe-i18n/locale-data/' + locale + '/stat_descriptions.json',
      'poe-i18n/locale-data/' + locale + '/BaseItemTypes.json',
      'poe-i18n/locale-data/' + locale + '/Mods.json'
    ], (locale_data, stat_descriptions, baseitemtypes, mods) => {
      resolve({ baseitemtypes, mods, locale_data, stat_descriptions });
    });
  });
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
