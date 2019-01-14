import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import locales from './locales';

export interface Props {
  code: string;
}

const styles = createStyles({
  root: {
    display: 'inline-block',
    height: '1em',
    '&:after': {
      content: "' ' attr(title)",
      fontSize: 18,
      verticalAlign: 'middle',
    },
  },
  icon: {
    height: '100%',
  },
});
const useClasses = makeStyles(styles);

function LocaleIcon(props: Props) {
  const { code } = props;
  const locale = locales[code];
  const classes = useClasses({});

  if (locale === undefined) {
    throw new Error(`unsupported language '${code}'`);
  }

  return (
    // add span to support :before and :after
    <span className={classes.root} title={locale.name}>
      <img className={classes.icon} src={locale.icon} alt={locale.name} />
    </span>
  );
}

export default LocaleIcon;
