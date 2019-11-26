import { MenuItem } from '@material-ui/core';
import React from 'react';

import LocaleIcon from './LocaleIcon';

export interface Props {
  active: boolean;
  locale: string;
  onClick: (locale: string) => void;
}

function ModGroup(props: Props) {
  const { active, locale, onClick } = props;
  const handleClick = React.useCallback(() => onClick(locale), [
    locale,
    onClick,
  ]);

  return (
    <MenuItem onClick={handleClick} selected={active}>
      <LocaleIcon code={locale} />
    </MenuItem>
  );
}

export default React.memo(ModGroup);
