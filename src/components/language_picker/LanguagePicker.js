// @flow
import React from 'react';
import {
  UncontrolledNavDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

import './style.css';
import LocaleIcon from './LocaleIcon';

export type Props = {
  active_locale: string,
  locales: string[],
  onChange: string => void
};

const default_props = {
  onChange: () => {}
};

const LanguagePicker = (props: Props) => {
  const { active_locale, locales, onChange } = props;

  return (
    <UncontrolledNavDropdown className="languages">
      <DropdownToggle nav caret>
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
    </UncontrolledNavDropdown>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
