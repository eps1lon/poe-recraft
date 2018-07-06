import React, { SFC } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

import LocaleIcon from './LocaleIcon';

import './style.css';

export interface Props {
  active_locale: string;
  locales: string[];
  onChange: (locale: string) => any;
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
            <DropdownItem
              key={locale}
              active={active_locale === locale}
              onClick={() => onChange(locale)}
            >
              <LocaleIcon code={locale} />
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
