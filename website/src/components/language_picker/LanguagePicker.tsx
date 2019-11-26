import { IconButton, Menu, Tooltip } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import React, { SFC } from 'react';

import Locale from './Locale';

export interface Props {
  active_locale: string;
  locales: string[];
  onChange: (locale: string) => void;
}

const default_props = {
  onChange: () => {},
};

const LanguagePicker: SFC<Props> = props => {
  const { active_locale, locales, onChange } = props;

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const handleIconClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { currentTarget } = event;
      // toggle between hide/show
      setAnchor(currentAnchor => (currentAnchor ? null : currentTarget));
    },
    [],
  );

  return (
    <>
      <Tooltip title="Change language" enterDelay={300}>
        <IconButton
          color="inherit"
          aria-owns={anchor ? 'language-menu' : undefined}
          aria-haspopup="true"
          onClick={handleIconClick}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleIconClick}
      >
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
      </Menu>
    </>
  );
};

LanguagePicker.defaultProps = default_props;

export default LanguagePicker;
