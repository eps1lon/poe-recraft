import { Tooltip } from '@material-ui/core';
import React, { SFC } from 'react';

interface Flags {
  [key: string]: boolean;
}

interface Props {
  children: React.ReactElement<any>;
  flags: Array<Flags | undefined>;
}

const FlagsTooltip: SFC<Props> = props => {
  const { children } = props;
  const titles = props.flags
    .map(flags => {
      if (flags != null) {
        return Object.entries(flags)
          .filter(([, value]) => value === true)
          .map(([flag]) => flag)
          .join(', ');
      } else {
        return null;
      }
    })
    .filter(Boolean);

  if (titles.length > 0) {
    return <Tooltip title={titles.join(', ')}>{children}</Tooltip>;
  } else {
    return children;
  }
};

export default FlagsTooltip;
