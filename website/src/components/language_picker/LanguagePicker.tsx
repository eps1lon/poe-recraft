import React, { SFC } from 'react';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import Locale from './Locale';
import LocaleIcon from './LocaleIcon';

import './style.css';

export interface Props {
  active_locale: string;
  locales: string[];
  onChange: (locale: string) => void;
}

const default_props = {
  onChange: () => {}
};

const LanguagePicker: SFC<Props> = props => {
  const { active_locale, locales, onChange } = props;

  return (
    <UncontrolledDropdown nav={true} className="languages">
      <DropdownToggle nav={true} caret={true}>
        <LocaleIcon code={active_locale} />
      </DropdownToggle>
      <DropdownMenu>
        {locales.map(locale => {
          return (
            <Locale
              key={locale}
              active={active_locale === locale}
              locale={locale}
              onClick={onChange}
            />
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
