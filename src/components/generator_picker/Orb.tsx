import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import orbs from './orbs';

export type Props = {
  id: string;
  onClick: (orb_id: string) => void;
};

const default_props = {
  onClick: () => {}
};

const Orb: SFC<Props> = ({ id, onClick }) => {
  const orb = orbs[id];

  if (orb === undefined) {
    throw new Error(`unsupported orb '${id}'`);
  }

  return (
    <FormattedMessage
      id={`poe.baseitemtypes.${orb.primary}.name`}
      defaultMessage={id}
    >
      {(name: string) => (
        <Button onClick={() => onClick(id)}>
          <img width="40" height="40" src={orb.icon} alt={name} title={name} />
        </Button>
      )}
    </FormattedMessage>
  );
};

Orb.defaultProps = default_props;

export default Orb;
