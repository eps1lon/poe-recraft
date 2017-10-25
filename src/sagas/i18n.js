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
  const language_code = locale.split('-')[0];

  return Promise.all([
    // bundling wrong react-intl into the chunk
    // which results in two requests, still better than 4
    // $FlowFixMe
    import(/* webpackChunkName: "i18n" */ `react-intl/locale-data/${language_code}`),
    // $FlowFixMe
    import(/* webpackChunkName: "i18n" */ `poe-i18n/locale-data/${locale}/stat_descriptions.json`),
    // $FlowFixMe
    import(/* webpackChunkName: "i18n" */ `poe-i18n/locale-data/${locale}/BaseItemTypes.json`),
    // $FlowFixMe
    import(/* webpackChunkName: "i18n" */ `poe-i18n/locale-data/${locale}/Mods.json`)
  ]).then(([locale_data, stat_descriptions, baseitemtypes, mods]) => ({
    baseitemtypes,
    mods,
    locale_data,
    stat_descriptions
  }));
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
