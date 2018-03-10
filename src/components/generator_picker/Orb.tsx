import React, { SFC } from 'react';
import { Button } from 'reactstrap';

import orbs from './orbs';
import { FormattedGenerator } from '../i18n';

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
    <FormattedGenerator id={orb.id}>
      {(name: string) => (
        <Button onClick={() => onClick(id)}>
          <img width="40" height="40" src={orb.icon} alt={name} title={name} />
        </Button>
      )}
    </FormattedGenerator>
  );
};

Orb.defaultProps = default_props;

export default Orb;
