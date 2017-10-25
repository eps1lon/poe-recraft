// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import orbs from './orbs';

export type Props = {
  id: string,
  onClick: string => void
};

const default_props = {
  onClick: () => {}
};

const Orb = ({ id, onClick }: Props) => {
  const orb = orbs[id];

  if (orb === undefined) {
    throw new Error(`unsupported orb '${id}'`);
  }

  return (
    <FormattedMessage
      id={`poe.baseitemtypes.${orb.primary}.name`}
      defaultMessage={id}
    >
      {name => (
        <Button onClick={() => onClick(id)}>
          <img width="40" height="40" src={orb.icon} alt={name} title={name} />
        </Button>
      )}
    </FormattedMessage>
  );
};

Orb.defaultProps = default_props;

export default Orb;
