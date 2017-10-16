// @flow
import React from 'react';
import {
  UncontrolledNavDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

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
    <UncontrolledNavDropdown>
      <DropdownToggle nav caret>
        lang
      </DropdownToggle>
      <DropdownMenu>
        {locales.map(locale => {
          return (
            <DropdownItem
              active={active_locale === locale}
              onClick={() => onChange(locale)}
            >
              {locale}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledNavDropdown>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
