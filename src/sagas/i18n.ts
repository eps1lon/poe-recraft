import { addLocaleData } from 'react-intl';
import { all, call, fork, put, take } from 'redux-saga/effects';

import { i18n_actions } from 'state/i18n';

const requireLocaleData = (locale: string) => {
  return import(/* webpackChunkName: "i18n/[request]" */ `../locales/${locale}`);
};

function* loadLocaleData() {
  while (true) {
    const { payload: locale } = yield take(i18n_actions.Type.CHANGE);
    const {
      baseitemtypes,
      item_classes,
      locale_data,
      mods,
      stat_descriptions
    } = yield call(requireLocaleData, locale);

    yield call(addLocaleData, locale_data);
    yield put(
      i18n_actions.setMessages({ poe: { baseitemtypes, item_classes, mods } })
    );
    yield put(i18n_actions.setDescriptions({ stat_descriptions }));
    // set last to trigger re-render
    yield put(i18n_actions.setLocale(locale));
  }
}

export default function* root() {
  yield all([fork(loadLocaleData)]);
}
