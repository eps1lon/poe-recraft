import Stat from './translate/Stat';
import { Locale } from './types';
import { applyMixins } from './util/mixins';

interface Options {
  locale?: Locale;
}

const defaultOptions = {
  locale: 'en_US' as Locale
};

class I18N implements Stat {
  public readonly locale: Locale;

  constructor(options: Options = {}) {
    const withDefault = {
      ...defaultOptions,
      ...options
    };

    this.locale = withDefault.locale;
  }

  stat = () => '';
}

applyMixins(I18N, [Stat]);

export default I18N;
