import { addLocaleData } from 'react-intl';
import { all, call, fork, put, take } from 'redux-saga/effects';

import { setDescriptions, setLocale, setMessages, Type } from 'actions/i18n';

const requireLocaleData = (locale: string) => {
  return import(/* webpackChunkName: "i18n/[request]" */ `../i18n/${locale}`);
};

function* loadLocaleData() {
  while (true) {
    const { payload: locale } = yield take(Type.CHANGE);
    const {
      baseitemtypes,
      item_classes,
      locale_data,
      mods,
      stat_descriptions
    } = yield call(requireLocaleData, locale);

    yield call(addLocaleData, locale_data);
    yield put(setMessages({ poe: { baseitemtypes, item_classes, mods } }));
    yield put(setDescriptions({ stat_descriptions }));
    // set last to trigger re-render
    yield put(setLocale(locale));
  }
}

export default function* root() {
  yield all([fork(loadLocaleData)]);
}
