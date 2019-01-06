import { Button, Tooltip } from '@material-ui/core';
import {
  createStyles,
  ExtendableStyles,
  makeStyles,
} from '@material-ui/styles';
import React from 'react';

import { FormattedGenerator } from 'components/i18n';
import orbs from './orbs';

const styles = createStyles({
  button: {},
  icon: {},
});

const useClasses = makeStyles(styles);

export interface Props extends ExtendableStyles<typeof styles> {
  id: string;
  onClick: (orb_id: string) => void;
}

function Orb(props: Props) {
  const { id, onClick } = props;
  const orb = orbs[id];

  const classes = useClasses(props);

  const handleClick = React.useCallback(
    () => {
      onClick(id);
    },
    [id, onClick],
  );

  if (orb === undefined) {
    throw new Error(`unsupported orb '${id}'`);
  }

  return (
    <FormattedGenerator id={orb.id}>
      {(name: string | JSX.Element) => {
        return (
          <Tooltip title={name}>
            <Button className={classes.button} onClick={handleClick}>
              <img
                className={classes.icon}
                width="40"
                height="40"
                src={orb.icon}
                alt={name.toString()}
              />
            </Button>
          </Tooltip>
        );
      }}
    </FormattedGenerator>
  );
}

export default React.memo(Orb);
