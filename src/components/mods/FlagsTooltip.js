// @flow
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

type Flags = {
  [string]: boolean
};

type Props = {
  id: string,
  flags: Array<?Flags>
};

const FlagsTooltip = (props: Props) => {
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
    return (
      <UncontrolledTooltip target={props.id}>
        {titles.join(', ')}
      </UncontrolledTooltip>
    );
  } else {
    return null;
  }
};

export default FlagsTooltip;
