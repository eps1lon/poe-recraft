import React, { SFC } from 'react';

import locales from './locales';

export interface Props {
  code: string;
}

const default_props = {};

const LanguagePicker: SFC<Props> = ({ code }) => {
  const locale = locales[code];

  if (locale === undefined) {
    throw new Error(`unsupported language '${code}'`);
  }

  return (
    // add span to support :before and :after
    <span className="locale-icon" title={locale.name}>
      <img src={locale.icon} alt={locale.name} />
    </span>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
