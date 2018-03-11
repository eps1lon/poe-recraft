import React, { SFC } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

import orbs from './orbs';
import { FormattedGenerator } from 'components/i18n';

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
      {(name: string) => {
        const dom_id = `generator-orb-${id}`;
        return (
          <>
            <Button onClick={() => onClick(id)} id={dom_id}>
              <img width="40" height="40" src={orb.icon} alt={name} />
            </Button>
            <UncontrolledTooltip placement="top" target={dom_id}>
              {name}
            </UncontrolledTooltip>
          </>
        );
      }}
    </FormattedGenerator>
  );
};

Orb.defaultProps = default_props;

export default Orb;
